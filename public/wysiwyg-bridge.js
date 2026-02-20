/**
 * wysiwyg-bridge.js
 *
 * Injected into the AppForge preview iframe to enable WYSIWYG DOM inspection.
 * Communicates with the parent window via postMessage.
 *
 * Inbound messages (from parent):
 *   { type: 'wysiwyg:enable' }   - Activate hover/click listeners
 *   { type: 'wysiwyg:disable' }  - Deactivate and clean up
 *   { type: 'wysiwyg:highlight', rect } - Draw highlight overlay on given rect
 *
 * Outbound messages (to parent):
 *   { type: 'wysiwyg:hover',  tag, text, rect, className, id }
 *   { type: 'wysiwyg:select', tag, text, rect, className, id, computedStyles }
 *   { type: 'wysiwyg:ready' }
 */
(function () {
  'use strict';

  if (window.__WYSIWYG_BRIDGE_LOADED__) return;
  window.__WYSIWYG_BRIDGE_LOADED__ = true;

  /* ------------------------------------------------------------------
     State
  ------------------------------------------------------------------ */
  var _active = false;
  var _hovered = null;
  var _selected = null;
  var _tooltip = null;
  var _highlight = null;

  /* ------------------------------------------------------------------
     Tooltip element (tag label above hovered element)
  ------------------------------------------------------------------ */
  function getTooltip() {
    if (!_tooltip) {
      _tooltip = document.createElement('div');
      _tooltip.id = '__wysiwyg_tooltip__';
      _tooltip.style.cssText = [
        'position:fixed',
        'background:#1e40af',
        'color:#fff',
        'font-size:10px',
        'font-family:monospace',
        'padding:2px 6px',
        'border-radius:3px',
        'pointer-events:none',
        'z-index:2147483647',
        'white-space:nowrap',
        'box-shadow:0 2px 8px rgba(0,0,0,0.4)',
        'display:none',
      ].join(';');
      document.body.appendChild(_tooltip);
    }
    return _tooltip;
  }

  /* ------------------------------------------------------------------
     Highlight overlay (for wysiwyg:highlight messages from parent)
  ------------------------------------------------------------------ */
  function getHighlight() {
    if (!_highlight) {
      _highlight = document.createElement('div');
      _highlight.id = '__wysiwyg_highlight__';
      _highlight.style.cssText = [
        'position:fixed',
        'border:2px solid #f59e0b',
        'background:rgba(245,158,11,0.08)',
        'pointer-events:none',
        'z-index:2147483646',
        'display:none',
        'transition:all 0.1s ease',
      ].join(';');
      document.body.appendChild(_highlight);
    }
    return _highlight;
  }

  /* ------------------------------------------------------------------
     Helpers
  ------------------------------------------------------------------ */
  function tagLabel(el) {
    var tag = el.tagName.toLowerCase();
    var id = el.id ? '#' + el.id : '';
    var cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';
    return '<' + tag + id + cls + '>';
  }

  function getRect(el) {
    var r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }

  function extractStyles(el) {
    var cs = window.getComputedStyle(el);
    return {
      color:           cs.color,
      backgroundColor: cs.backgroundColor,
      fontSize:        cs.fontSize,
      fontWeight:      cs.fontWeight,
      fontFamily:      cs.fontFamily,
      fontStyle:       cs.fontStyle,
      textAlign:       cs.textAlign,
      textDecoration:  cs.textDecoration,
      borderRadius:    cs.borderRadius,
      borderWidth:     cs.borderWidth,
      borderColor:     cs.borderColor,
      borderStyle:     cs.borderStyle,
      display:         cs.display,
      width:           cs.width,
      height:          cs.height,
      paddingTop:      cs.paddingTop,
      paddingRight:    cs.paddingRight,
      paddingBottom:   cs.paddingBottom,
      paddingLeft:     cs.paddingLeft,
      marginTop:       cs.marginTop,
      marginRight:     cs.marginRight,
      marginBottom:    cs.marginBottom,
      marginLeft:      cs.marginLeft,
      gap:             cs.gap,
      flexDirection:   cs.flexDirection,
    };
  }

  /* Build a CSS selector path for an element (for T-0170 sync hint) */
  function buildSelectorPath(el) {
    var parts = [];
    var current = el;
    var depth = 0;
    while (current && current !== document.body && depth < 5) {
      var tag = current.tagName.toLowerCase();
      var id = current.id ? '#' + current.id : '';
      var cls = current.className && typeof current.className === 'string'
        ? '.' + current.className.trim().split(/\s+/).slice(0, 2).join('.')
        : '';
      parts.unshift(tag + id + cls);
      current = current.parentElement;
      depth++;
    }
    return parts.join(' > ');
  }

  /* ------------------------------------------------------------------
     Outline management
  ------------------------------------------------------------------ */
  function applyHoverOutline(el) {
    // Restore previous hovered element
    if (_hovered && _hovered !== _selected) {
      _hovered.style.outline = _hovered.__wysiwyg_prev_outline__ || '';
      _hovered.style.outlineOffset = '';
    }
    _hovered = el;
    if (el && el !== _selected) {
      _hovered.__wysiwyg_prev_outline__ = el.style.outline || '';
      el.style.outline = '2px dashed #3b82f6';
      el.style.outlineOffset = '1px';
    }

    var tip = getTooltip();
    if (el) {
      var rect = el.getBoundingClientRect();
      tip.textContent = tagLabel(el);
      tip.style.display = 'block';
      tip.style.top = Math.max(0, rect.top - 22) + 'px';
      tip.style.left = rect.left + 'px';
    } else {
      tip.style.display = 'none';
    }
  }

  function applySelectedOutline(el) {
    // Restore previous selected element
    if (_selected) {
      _selected.style.outline = _selected.__wysiwyg_prev_outline_sel__ || '';
      _selected.style.outlineOffset = '';
    }
    _selected = el;
    if (el) {
      _selected.__wysiwyg_prev_outline_sel__ = el.style.outline || '';
      el.style.outline = '2px solid #f59e0b';
      el.style.outlineOffset = '1px';
    }
  }

  /* ------------------------------------------------------------------
     Event handlers
  ------------------------------------------------------------------ */
  function onMouseOver(e) {
    if (!_active) return;
    var el = e.target;
    // Skip our own overlay elements
    if (el.id === '__wysiwyg_tooltip__' || el.id === '__wysiwyg_highlight__') return;
    applyHoverOutline(el);

    window.parent.postMessage({
      type:      'wysiwyg:hover',
      tag:       el.tagName.toLowerCase(),
      id:        el.id || '',
      className: (typeof el.className === 'string') ? el.className : '',
      text:      (el.textContent || '').slice(0, 200),
      rect:      getRect(el),
    }, '*');
  }

  function onMouseOut(e) {
    if (!_active) return;
    var el = e.target;
    if (el.id === '__wysiwyg_tooltip__' || el.id === '__wysiwyg_highlight__') return;
    if (el === _hovered && el !== _selected) {
      el.style.outline = el.__wysiwyg_prev_outline__ || '';
      el.style.outlineOffset = '';
    }
    _hovered = null;
    var tip = getTooltip();
    tip.style.display = 'none';
  }

  function onClick(e) {
    if (!_active) return;
    // Skip clicks on our own overlay elements
    var el = e.target;
    if (el.id === '__wysiwyg_tooltip__' || el.id === '__wysiwyg_highlight__') return;

    e.preventDefault();
    e.stopPropagation();

    applySelectedOutline(el);

    window.parent.postMessage({
      type:           'wysiwyg:select',
      tagName:        el.tagName.toLowerCase(),
      id:             el.id || '',
      className:      (typeof el.className === 'string') ? el.className : '',
      textContent:    (el.textContent || '').slice(0, 500),
      computedStyles: extractStyles(el),
      rect:           getRect(el),
      selectorPath:   buildSelectorPath(el),
      innerHTML:      el.innerHTML.slice(0, 1000),
    }, '*');
  }

  /* ------------------------------------------------------------------
     Activate / Deactivate
  ------------------------------------------------------------------ */
  function activate() {
    if (_active) return;
    _active = true;
    document.addEventListener('mouseover', onMouseOver, true);
    document.addEventListener('mouseout',  onMouseOut,  true);
    document.addEventListener('click',     onClick,     true);
    document.body.style.cursor = 'crosshair';
    window.parent.postMessage({ type: 'wysiwyg:ready' }, '*');
  }

  function deactivate() {
    if (!_active) return;
    _active = false;
    document.removeEventListener('mouseover', onMouseOver, true);
    document.removeEventListener('mouseout',  onMouseOut,  true);
    document.removeEventListener('click',     onClick,     true);
    document.body.style.cursor = '';

    // Restore outlines
    if (_hovered && _hovered !== _selected) {
      _hovered.style.outline = _hovered.__wysiwyg_prev_outline__ || '';
      _hovered.style.outlineOffset = '';
    }
    if (_selected) {
      _selected.style.outline = _selected.__wysiwyg_prev_outline_sel__ || '';
      _selected.style.outlineOffset = '';
    }
    _hovered = null;
    _selected = null;

    // Clean up DOM elements
    var tip = document.getElementById('__wysiwyg_tooltip__');
    if (tip) tip.remove();
    _tooltip = null;

    var hl = document.getElementById('__wysiwyg_highlight__');
    if (hl) hl.remove();
    _highlight = null;
  }

  /* ------------------------------------------------------------------
     Handle highlight request from parent
  ------------------------------------------------------------------ */
  function applyHighlight(rect) {
    if (!rect) return;
    var hl = getHighlight();
    hl.style.display = 'block';
    hl.style.top    = rect.top    + 'px';
    hl.style.left   = rect.left   + 'px';
    hl.style.width  = rect.width  + 'px';
    hl.style.height = rect.height + 'px';
  }

  /* ------------------------------------------------------------------
     Listen for messages from parent
  ------------------------------------------------------------------ */
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || typeof data.type !== 'string') return;

    switch (data.type) {
      case 'wysiwyg:enable':
        activate();
        break;
      case 'wysiwyg:disable':
        deactivate();
        break;
      case 'wysiwyg:highlight':
        applyHighlight(data.rect);
        break;
      default:
        break;
    }
  });

  /* Auto-activate if the parent has already enabled WYSIWYG mode
     (handles the case where the iframe reloads while mode is active) */
  window.parent.postMessage({ type: 'wysiwyg:bridge_ready' }, '*');

})();
