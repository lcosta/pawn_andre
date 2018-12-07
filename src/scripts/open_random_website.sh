#!/usr/bin/env bash
expressions[0]="http://www.nyan.cat/"
expressions[1]="https://geekprank.com/hacker/"
expressions[2]="https://answers.yahoo.com/question/index;_ylt=AwrC1zF2fwpcpBgA3yxPmolQ;_ylu=X3oDMTEybTFvb2wxBGNvbG8DYmYxBHBvcwMxBHZ0aWQDQjI1NTlfMQRzZWMDc3I-?qid=20081210174759AADf9SE"
expressions[3]="https://answers.yahoo.com/question/index;_ylt=AwrC1Cqxfwpcol4AkipPmolQ;_ylu=X3oDMTEybTFvb2wxBGNvbG8DYmYxBHBvcwMxBHZ0aWQDQjI1NTlfMQRzZWMDc3I-?qid=20110126015747AAlxX4M"
selectedexpression=${expressions[$RANDOM % ${#expressions[@]} ]}
sensible-browser "$selectedexpression"
