const crypto = require("crypto");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");

module.exports = withBundleAnalyzer(
    withCSS({
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: "[local]___[hash:base64:5]",
        },
        ...withLess(
            withSass({
                lessLoaderOptions: {
                    javascriptEnabled: true,
                    // modifyVars: {
                    //     "primary-color": "#F15A2C",
                    //     "font-size-base": "14px",
                    //     "table-padding-vertical": "10px",
                    //     "table-padding-horizontal": "10px",
                    //     "collapse-header-bg": "#FFFFFF",
                    // },
                },
                // postcssLoaderOptions: {
                //     parser: true,
                //     config: {
                //         ctx: {
                //             theme: JSON.stringify(process.env.REACT_APP_THEME),
                //         },
                //     },
                // },
                publicRuntimeConfig: {
                    // Will be available on both server and client
                    staticFolder: "/static",
                },
                images: {
                    domains: ["1500001829.vod2.myqcloud.com", "localhost"],
                },
                i18n: {
                    locales: ["en", "th"],
                    defaultLocale: "th",
                },
                webpack: (config, { isServer }) => {
                    // Fixes npm packages that depend on `fs` module
                    config.node = {
                        fs: "empty",
                        net: "empty",
                        tls: "empty",
                    };
                    config.plugins.push(
                        new webpack.EnvironmentPlugin(localEnv)
                    );

                    if (isServer) {
                        const antStyles = /antd\/.*?\/style.*?/;
                        const origExternals = [...config.externals];
                        config.externals = [
                            (context, request, callback) => {
                                if (request.match(antStyles)) return callback();
                                if (typeof origExternals[0] === "function") {
                                    origExternals[0](
                                        context,
                                        request,
                                        callback
                                    );
                                } else {
                                    callback();
                                }
                            },
                            ...(typeof origExternals[0] === "function"
                                ? []
                                : origExternals),
                        ];

                        config.module.rules.unshift({
                            test: antStyles,
                            use: "null-loader",
                        });
                    }

                    return config;
                },
                distDir: "build",
                generateBuildId: async () => {
                    // For multiple instances deployment, we'll get BUILD_ID from $CIRCLE_SHA1
                    // If BUILD_ID not presented, just use random it
                    const buildId =
                        process.env.BUILD_ID ||
                        crypto.randomBytes(20).toString("hex");
                    console.log("BUILD_ID: ", buildId);
                    return buildId;
                },
            })
        ),
    })
);
