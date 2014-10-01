#!/usr/bin/env sh
istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive api/test
export CODECLIMATE_REPO_TOKEN=c5b2952432c62c390850c87a2c41ed62a0fee517b80650fc9a955d7683b8ac9a
codeclimate < coverage/lcov.info