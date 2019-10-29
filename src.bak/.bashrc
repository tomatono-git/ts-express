# ~/.bashrc にコピーする

# export PS1="\[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]$MSYSTEM \[\033[33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\]\n$"
# ローカルでしか使わないので \h は抜いてある。 ローカル以外でも使うなら入れるべき。
export PS1="\[\033[32m\]\u:\[\033[33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\] $"

alias ll='ls -l'
alias nrun='npm run'
