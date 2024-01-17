#!/bin/bash

echo "<!DOCTYPE html>"
echo "<html>"
echo "<head>"
echo "<title>Nginx Environment Variables</title>"
echo "</head>"
echo "<body>"
echo "<h1>Nginx Environment Variables</h1>"

for env_var in $(env); do
  echo "<p>$env_var</p>"
done

echo "</body>"
echo "</html>"