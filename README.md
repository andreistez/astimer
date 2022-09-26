# ASTimer :alarm_clock:
____

## What is this?
ES6 countdown timer to show how many days, hours, minutes and seconds left to your deadline date.

## Installation
1. First of all, install this package as usually:
```
npm i @critick/astimer
```
2. Add correct `HTML` structure for your timer (don't forget to set data-attributes - the date of your deadline):
```html
<div class="timer" data-year="2022" data-month="12" data-day="31"></div>
```
3. Import `ASTimer` to your JS file from `node_modules`:
```javascript
import ASTimer from '@critick/astimer'
```
4. Pass your HTML timer's CSS selector to `ASTimer` constructor:
```javascript
const t = new ASTimer('.timer')
```
5. All is set, you are awesome! :smile::+1: