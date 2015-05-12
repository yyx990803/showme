#!/usr/bin/env node

var re = /'(git:|https:|git+https:)\/\/(github\.com\/.*?)(\.git)?'/
var exec = require('child_process').exec
var spawn = require('child_process').spawn
var name = process.argv[2]

exec('npm view ' + name, function (err, res) {
  if (err) throw err
  var match = res.match(re)
  if (match) {
    var url = match[2].replace(/\/issues$/, '')
    openURL('https://' + url)
  } else {
    console.log('Can\'t find a github page for package: ' + name)
  }
})

function openURL (url) {
  switch (process.platform) {
    case "darwin":
      exec('open ' + url)
      break
    case "win32":
      exec('start ' + url)
      break
    default:
      spawn('xdg-open', [url])
  }
}