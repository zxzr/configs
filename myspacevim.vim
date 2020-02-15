function! myspacevim#before() abort

    augroup fmt
      autocmd!
      autocmd BufWritePre *.py undojoin | Neoformat
    augroup END
    "
    " autocmd BufEnter * lcd %:p:h
    " set rtp+=~/neoformat 独立安装neoformat.
    "
    command W3M execute "edit term://w3m -B"
    set ic
endfunction

function! myspacevim#after() abort
endfunction

"| `exe`       | the name the formatter executable in the path | required
"| `args`      | list of arguments | default: [] | optional
"| `replace`   | overwrite the file, instead of updating the buffer | default: 0 | optional
"| `stdin`     | send data to the stdin of the formatter | default 0 | optional
"| `stderr`    | used to specify whether stderr output should be read along with
"	     the stdin, otherwise redirects stderr to `stderr.log` file in neoformat's
"	     temporary directory | default 0 | optional
"| `no_append` | do not append the `path` of the file to the formatter command,
"	     used when the `path` is in the middle of a command | default: 0 |
"	     optional
"| `env`       | list of environment variables to prepend to the command | default: [] | optional
"
"| `valid_exit_codes` | list of valid exit codes for formatters who do not respect common unix practices | \[0] | optional
