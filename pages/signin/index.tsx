import { useState } from "react";
import API from "services";
import auth from "services/auth";
import Router from "next/router";
import { Button, Input, message } from "antd";
import { Form } from "antd";
import "./index.less";

export default function Index(props) {
    const [load, setLoad] = useState(false);
    const onFinish = async (values) => {
        setLoad(true);
        const { username, password } = values;
        try {
            const {
                data: { user, access_token },
            } = await API.auth.login({
                username,
                password,
            });
            auth.setCookie(
                {
                    user,
                    token: access_token,
                },
                () => {
                    Router.push("/");
                }
            );
        } catch (error) {
            setLoad(false);
            console.log({ error });
            message.error("รหัสผ่านไม่ถูกต้อง");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("" + errorInfo.errorFields[0].errors[0]);
    };

    return (
        <div className="form-signin bg-color bg-white">
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input placeholder="username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button type="primary" block loading={load} htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
