#删除打包后的文件，但是不删除模板文件
find ./server/views -type f \( -iname "*.*" ! -iname "*.*.*" \) -exec rm {} \;

webpack
