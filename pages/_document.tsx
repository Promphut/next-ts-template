import Document, { Head, Main, NextScript, Html } from "next/document";

class MyDocument extends Document {
    static getInitialProps({ renderPage, req }) {
        const page = renderPage((App) => (props) => <App {...props} />);
        return { ...page, cookies: req.cookies };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
