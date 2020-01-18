" Zxzr Default {{{

" Plugins {{{
call plug#begin('~/.config/nvim/plugs') 

"General{{{

Plug '907th/vim-auto-save'
Plug 'scrooloose/nerdtree'
Plug 'mhinz/vim-startify'
"}}}
"
"Markdown{{{

Plug 'godlygeek/tabular'
Plug 'SirVer/ultisnips',{'for':'markdown'}
Plug 'mzlogin/vim-markdown-toc'
Plug 'plasticboy/vim-markdown'
Plug 'iamcco/markdown-preview.nvim'
Plug 'ferrine/md-img-paste.vim'


"}}}

"Python{{{

Plug 'honza/vim-snippets',{'for':'python'}
Plug 'Yggdroot/indentLine',{'for':'python'}
Plug 'jiangmiao/auto-pairs',{'for':'python'}
Plug 'vim-scripts/indentpython.vim',{'for':'python'}
Plug 'luochen1990/rainbow',{'for':'python'}
Plug 'ycm-core/YouCompleteMe',{'for':'python'}
"}}}
" 标签导航
Plug 'majutsushi/tagbar'
Plug 'vim-scripts/ctags.vim'
" 静态代码分析
Plug 'scrooloose/syntastic'
" 文件搜索
Plug 'kien/ctrlp.vim'
" 美化状态栏
Plug 'Lokaltog/vim-powerline'
" 主题风格
Plug 'altercation/vim-colors-solarized'
" python自动补全
Plug 'davidhalter/jedi-vim'
Plug 'klen/python-mode'
" 括号匹配高亮
Plug 'kien/rainbow_parentheses.vim'
" 可视化缩进
Plug 'nathanaelkane/vim-indent-guides'
call plug#end()

" Markdown{{{
let g:vmt_auto_update_on_save = 0 
let g:mkdp_browser  ="/usr/bin/firefox"
let g:mkdp_preview_options = {
    \ 'mkit': {},
    \ 'katex': {},
    \ 'uml': {},
    \ 'maid': {},
    \ 'disable_sync_scroll': 0,
    \ 'sync_scroll_type': 'middle',
    \ 'hide_yaml_meta': 1,
    \ 'sequence_diagrams': {}
    \ }
let g:mkdp_auto_close=0
let g:mkdp_refresh_slow = 0
let g:vim_markdown_anchorexpr = "'<<'.v:anchor.'>>'"
let g:vim_markdown_math = 1
let g:mkdp_auto_start = 0
let g:vim_markdown_strikethrough = 1

let g:mdip_imgdir = 'pic'
let g:mdip_imgname = 'image'

"}}}

" UltiSnips{{{
let g:UltiSnipsExpandTrigger = '<tab>'
let g:UltiSnipsJumpForwardTrigger = '<tab>'
let g:UltiSnipsJumpBackwardTrigger = '<S-tab>'

"if &filetype ==# 'markdown'
let g:UltiSnipsSnippetDirectories=["~/.config/nvim/plugs/mysnips"]
let g:UltiSnipsSnippetsDir = '~/.config/nvim/plugs/ultisnips/'
let g:UltiSnipsEditSplit="vertical"
"}}}

"others {{{ 
"let g:startify_session_delete_buffers = 1
"let g:startify_files_number = 10
let g:NERDTreeWinPos = "left"
"let g:rainbow_active = 1
"let g:rainbow_conf = {
"\   'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick'],
"\   'ctermfgs': ['lightblue', 'lightyellow', 'lightcyan', 'lightmagenta'],
"\   'operators': '_,_',
"\   'parentheses': ['start=/(/ end=/)/ fold', 'start=/\[/ end=/\]/ fold', 'start=/{/ end=/}/ fold'],
"\   'separately': {
"\       '*': {},
"\       'tex': {
"\           'parentheses': ['start=/(/ end=/)/', 'start=/\[/ end=/\]/'],
"\       },
"\       'lisp': {
"\           'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick', 'darkorchid3'],
"\       },
"\       'vim': {
"\           'parentheses': ['start=/(/ end=/)/', 'start=/\[/ end=/\]/', 'start=/{/ end=/}/ fold', 'start=/(/ end=/)/ containedin=vimFuncBody', 'start=/\[/ end=/\]/ containedin=vimFuncBody', 'start=/{/ end=/}/ fold containedin=vimFuncBody'],
"\       },
"\       'html': {
"\           'parentheses': ['start=/\v\<((area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)[ >])@!\z([-_:a-zA-Z0-9]+)(\s+[-_:a-zA-Z0-9]+(\=("[^"]*"|'."'".'[^'."'".']*'."'".'|[^ '."'".'"><=`]*))?)*\>/ end=#</\z1># fold'],
"\       },
"\       'css': 0,
"\   }
"\}
"Auto Save
let g:auto_save = 1
let g:auto_save_events = ["InsertLeave", "TextChanged",  "CursorHoldI","CursorHold", "CompleteDone"]
"}}}
"
"python{{{
let g:ycm_python_interpreter_path = "~/anaconda3/bin/python" 
let g:ycm_python_sys_path = ['~/anaconda3']
let g:ycm_extra_conf_vim_data = [
  \  'g:ycm_python_interpreter_path',
  \  'g:ycm_python_sys_path'
  \]
let g:ycm_global_ycm_extra_conf = '~/global_extra_conf.py'

let g:indentLine_setColors = 0
"}}}

"}}}

" Settings{{{
set nocompatible
syntax on                    " 开启文件类型侦测
filetype off
filetype indent on           " 针对不同的文件类型采用不同的缩进格式
filetype plugin on           " 针对不同的文件类型加载对应的插件
set nu
set ignorecase
set splitbelow
set splitright
" vim 文件折叠方式为 marker
"augroup ft_vim
"    au!
"
"    au FileType vim setlocal foldmethod=marker
"augroup END

exec 'cd ' . fnameescape('~')
set path=~
set nobackup
set nowb
set noswapfile
set history=1024
"jset showmatch
"autocmd BufEnter * lcd %:p:h
set autochdir
set whichwrap=b,s,<,>,[,]
set nobomb
set backspace=indent,eol,start whichwrap+=<,>,[,]
" 设置 alt 键不映射到菜单栏
set winaltkeys=no
set conceallevel=2
set clipboard+=unnamedplus
set shiftwidth=4
set expandtab
set autoread
" the mouse pointer is hidden when characters are typed
set mousehide
" Height of the command bar
set cmdheight=1
"}}}

" Functions{{{
"Delet unnecessary under structure of generated toc
function RToc()
    exe "/-toc .* -->"
    let lstart=line('.')
    exe "/-toc -->"
    let lnum=line('.')
    execute lstart.",".lnum."g/           /d"
endfunction

" open terminal in split window
function MyCMD(name)
    execute "vs"
    execute "term ".a:name
endfunction


command!  CMD
        \ call MyCMD("")

command! PATH
        \ let @+ = expand("%:p")

"command! TMD
""        \ execute "!start typora %:p"


command! WSP
        \ execute "cd ~/Desktop/ | NERDTree"

" Keymap{{{
autocmd TermOpen * setlocal statusline=%{b:term_title}
tnoremap <Esc> <C-\><C-n>
tnoremap <A-h> <C-\><C-N><C-w>h
tnoremap <A-j> <C-\><C-N><C-w>j
tnoremap <A-k> <C-\><C-N><C-w>k
tnoremap <A-l> <C-\><C-N><C-w>l
inoremap <A-h> <C-\><C-N><C-w>h
inoremap <A-j> <C-\><C-N><C-w>j
inoremap <A-k> <C-\><C-N><C-w>k
inoremap <A-l> <C-\><C-N><C-w>l
nnoremap <A-h> <C-w>h
nnoremap <A-j> <C-w>j
nnoremap <A-k> <C-w>k
nnoremap <A-l> <C-w>l
" 设置缩进与反缩进为c-d,c-s
inoremap <M-s> <C-d>
inoremap <M-d> <C-t>
inoremap <C-s> <C-d>
inoremap <C-d> <C-t>

" Ctrl+hjkl 光标移动
inoremap <C-l> <RIGHT>
inoremap <C-k> <UP>
inoremap <C-h> <LEFT>
inoremap <C-j> <DOWN>
inoremap <C-o> <C-LEFT>
inoremap <C-p> <C-RIGHT>

inoremap <M-l> <RIGHT>
inoremap <M-k> <UP>
inoremap <M-h> <LEFT>
inoremap <M-j> <DOWN>
inoremap <M-o> <C-LEFT>
inoremap <M-p> <C-RIGHT>

inoremap <C-Space> <C-n>
inoremap <C-b> <ESC>o<C-d><C-d><C-d>
inoremap <C-q> <Backspace>

" Map jk to normal mode
inoremap jj <Esc>
inoremap JJ <Esc>
inoremap Jj <Esc>
inoremap <C-c> <Esc>

nnoremap <S-Space> :/
nnoremap <S-b> :noh<CR>

"Resize windows
nmap <silent> <C-l> :vertical resize +5<CR>
nmap <silent> <C-k> :resize -5<CR>
nmap <silent> <C-J> ::resize +5<CR>
nmap <silent> <C-h> :vertical resize -5<CR>
nnoremap <silent> <C-e> <C-e><C-e><C-e>
nnoremap <silent> <C-z> <C-y><C-y><C-y>

noremap <space> :

" Make moving around works well in multi lines
map <silent> j gj
map <silent> k gk

map <silent> <UP> gk
map <silent> <DOWN> gj

"map F2 to open NERDTree
map <F2> :NERDTreeToggle<CR>
map <S-F2> :NERDTreeFind<CR>
map <F3> :tabnew<CR>

autocmd FileType markdown nnoremap <silent> <C-p> :call mdip#MarkdownClipboardImage()<CR>

"}}}

" Lang & Enzocoding {{{
set fileencodings=utf-8,gbk2312,gbk,gb18030,cp936
set encoding=utf-8
set langmenu=zh_CN
let $LANG = 'en_US.UTF-8'
set nospell
set spelllang=de_de

"language messages zh_CN.UTF-8
" }}}

"Other Options {{{


" NERDTree config{{{
" open a NERDTree automatically when vim starts up
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" Welcome Page{{{

let g:startify_custom_header = [
\ '                             ███████████               ',
\ '                          ███████████████████               ',
\]

" }}}
" }}}
"end
"}}}
"

" vim diff {{{
"source $VIMRUNTIME/vimrc_example.vim

" Use the internal diff if available.
" Otherwise use the special 'diffexpr' for Windows.
if &diffopt !~# 'internal'
  set diffexpr=MyDiff()
endif
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg1 = substitute(arg1, '!', '\!', 'g')
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg2 = substitute(arg2, '!', '\!', 'g')
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let arg3 = substitute(arg3, '!', '\!', 'g')
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      if empty(&shellxquote)
        let l:shxq_sav = ''
        set shellxquote&
      endif
      let cmd = '"' . $VIMRUNTIME . '\diff"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  let cmd = substitute(cmd, '!', '\!', 'g')
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3
  if exists('l:shxq_sav')
    let &shellxquote=l:shxq_sav
  endif
endfunction

" }}}
au BufNewFile,BufRead *.py
\ set tabstop=4
\ set softtabstop=4
\ set shiftwidth=4
\ set textwidth=79
\ set expandtab
\ set autoindent
\ set fileformat=unix

au BufNewFile,BufRead *.js, *.html, *.css
\ set tabstop=2
\ set softtabstop=2
\ set shiftwidth=2
 
" tagbar标签导航
nmap <Leader>t :TagbarToggle<CR>
let g:tagbar_ctags_bin='/usr/bin/ctags'
let g:tagbar_width=30
autocmd BufReadPost *.cpp,*.c,*.h,*.hpp,*.cc,*.cxx call tagbar#autoopen()
let g:jedi#auto_initialization = 1
 
" 主题 solarized
let g:solarized_termtrans=1
let g:solarized_contrast="normal"
let g:solarized_visibility="normal"
" 配色方案
set background=dark
set t_Co=256
colorscheme solarized
 
" 目录文件导航NERD-Tree
" \nt 打开nerdree窗口，在左侧栏显示
let NERDTreeHighlightCursorline=1
let NERDTreeIgnore=[ '\.pyc$', '\.pyo$', '\.obj$', '\.o$', '\.so$', '\.egg$', '^\.git$', '^\.svn$', '^\.hg$' ]
let g:netrw_home='~/bak'
"close vim if the only window left open is a NERDTree
"autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | end
 
" ctrlp文件搜索
" 打开ctrlp搜索
let g:ctrlp_map = '<leader>f'
let g:ctrlp_cmd = 'CtrlP'
" 相当于mru功能，show recently opened files
map <leader>ff :CtrlPMRU<CR>
" set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux"
let g:ctrlp_custom_ignore = {
    \ 'dir':  '\v[\/]\.(git|hg|svn|rvm)$',
    \ 'file': '\v\.(exe|so|dll|zip|tar|tar.gz)$',
    \ }
"\ 'link': 'SOME_BAD_SYMBOLIC_LINKS',
let g:ctrlp_working_path_mode=0
let g:ctrlp_match_window_bottom=1
let g:ctrlp_max_height=15
let g:ctrlp_match_window_reversed=0
let g:ctrlp_mruf_max=500
let g:ctrlp_follow_symlinks=1
 
" vim-powerline美化状态
" let g:Powerline_symbols = 'fancy'
let g:Powerline_symbols = 'unicode'
 
" 括号匹配高亮
let g:rbpt_colorpairs = [
    \ ['brown',       'RoyalBlue3'],
    \ ['Darkblue',    'SeaGreen3'],
    \ ['darkgray',    'DarkOrchid3'],
    \ ['darkgreen',   'firebrick3'],
    \ ['darkcyan',    'RoyalBlue3'],
    \ ['darkred',     'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['brown',       'firebrick3'],
    \ ['gray',        'RoyalBlue3'],
    \ ['black',       'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['Darkblue',    'firebrick3'],
    \ ['darkgreen',   'RoyalBlue3'],
    \ ['darkcyan',    'SeaGreen3'],
    \ ['darkred',     'DarkOrchid3'],
    \ ['red',         'firebrick3'],
    \ ]
let g:rbpt_max = 40
let g:rbpt_loadcmd_toggle = 0
 
" 可视化缩进
let g:indent_guides_enable_on_vim_startup = 0  " 默认关闭
let g:indent_guides_guide_size            = 1  " 指定对齐线的尺寸
let g:indent_guides_start_level           = 2  " 从第二层开始可视化显示缩进
" 运行文件
map <F5> :w<cr>:r!python %<cr>
