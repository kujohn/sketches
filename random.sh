#!/usr/bin/env bash

if ! superheroes -v COMMAND &> /dev/null
then
    echo "superheroes-cli could not be found, installing now via npm..."
	npm install --global superheroes-cli
fi

NAME=$(superheroes | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
mkdir $NAME
echo $NAME
