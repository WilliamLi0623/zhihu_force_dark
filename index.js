// ==UserScript==
// @name         知乎深色模式
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  强制开启知乎深色模式
// @author       WilliamLi0623
// @match        *://*.zhihu.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
  'use strict'
  let firstRun = true
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  }

  function setTheme(theme) {
    window.location.href = window.location.href.split('?')[0] + '?theme=' + theme
  }

  function setRootTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    fetch('/?theme=' + theme)
  }

  function switchTheme() {
    if (firstRun) {
      const isZhihuDark = isDark()
      const theme = 'dark'
      setTheme(theme)
      setRootTheme(theme)
      firstRun = false
      return
    }
  }

  switchTheme()

  const mql = window.matchMedia('(prefers-color-scheme: dark)')

  mql.addEventListener('change', switchTheme)
})()