const appMenu = [
    {label:'Home', icon:'home', url:'/'},
    {label:'Report', icon:'table', url:'/iama/Report'},
    {label:'Employee', icon:'account', url:'/iama/Employee'},
    {label:'Setting', icon:'cog', submenu: [
        [
            {label:'Application', url:'/iama/Application'},
            {label:'Setup', url:'/iama/Setup'},
        ]
    ]},
];

export default appMenu