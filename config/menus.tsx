export const menus = (local: string) => {
    return [
        {
            title: "Main",
            sub_menus: () => [
                {
                    title: "main",
                    key: "main",
                    link: {
                        pathname: "/",
                    },
                },
            ],
        },
    ];
};
