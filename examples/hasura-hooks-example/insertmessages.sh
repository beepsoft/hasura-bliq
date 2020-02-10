#!/bin/bash

if [ -z "$1" ]
then
	COUNT=10
else
	COUNT=$1
fi
echo $BASH_VERSION

echo "Inserting $COUNT messages"
for i in $(seq 1 $COUNT); do
  echo -n "$i. "
  curl 'http://localhost:6001/v1/graphql' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'x-hasura-admin-secret: hasura-hooks' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36' -H 'content-type: application/json' -H 'Accept: */*' -H 'Origin: http://localhost:6001' -H 'Sec-Fetch-Site: same-origin' -H 'Sec-Fetch-Mode: cors' -H 'Referer: http://localhost:6001/console/api-explorer' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9,es;q=0.8,hu;q=0.7' --data-binary '{"query":"mutation {\n  insert_message(objects:[\n    {\n      message: \"Message -- '"`date`"'\"\n    }\n  ]) {\n    affected_rows\n    returning {\n      id\n      message\n      createdAt\n      updatedAt\n    }\n  }\n}","variables":null}' --compressed
 echo
done

