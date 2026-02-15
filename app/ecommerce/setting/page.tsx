"use client";

import React, { useState } from "react";
import { Button, Switch, Input, Form, notification } from "antd";

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const onFinish = (values: any) => {
        console.log("Settings submitted: ", values);
        notification.success({
            message: 'Settings Updated',
            description: 'Your settings have been successfully updated!',
        });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-6 w-full max-w-md"
            >
                {/* Account Settings */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                    <Form.Item label="Username" name="username">
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" placeholder="Enter your email" />
                    </Form.Item>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Notification Preferences</h2>
                    <Form.Item label="Enable Notifications" name="notifications">
                        <Switch
                            checked={notificationsEnabled}
                            onChange={setNotificationsEnabled}
                        />
                    </Form.Item>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Privacy Settings</h2>
                    <Form.Item label="Make profile public" name="profilePublic" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </div>

                {/* Language Preference */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Language Preference</h2>
                    <Form.Item label="Select Language" name="language">
                        <Input placeholder="Select your preferred language" />
                    </Form.Item>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Settings;
