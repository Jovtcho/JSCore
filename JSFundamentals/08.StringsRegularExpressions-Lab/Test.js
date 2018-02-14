function printObj() {
    let str = 'Visit <link>http://fb.com</link> or <link>http://softuni.bg</link>.';
    console.log(str);

    str = str.replace(/<link>(.*?)<\/link>/g, '<a href="$1">Link</a>');
    console.log(str);
}

printObj();