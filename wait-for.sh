#!/usr/bin/env bash
# wait-for.sh taken from common public utility - waits for host:port and then runs command
set -e

hostport="$1"
shift
cmd="$@"

IFS=':' read -r host port <<< "$hostport"

echo "Waiting for $host:$port..."
until nc -z "$host" "$port"; do
  >&2 echo "Service not available yet - sleeping"
  sleep 2
done

>&2 echo "$host:$port is available - executing command"
exec $cmd
