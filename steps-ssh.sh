#!/usr/bin/env bash
sudo apt install openssh-server
sudo apt install openssh-client
ssh-keygen.exe -t ecdsa
ssh-copy-id -p 5678 lab0@127.0.0.1
