import React, { useMemo } from "react";
import { Form, Input, Button, notification } from "antd";

const Context = React.createContext({ name: "Default" });

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  // Define the type for form values
  interface FormValues {
    fullName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
  }

  const contextValue = useMemo(() => ({ name: "User Form" }), []);

  // Function to handle form submission
  const onFinish = (values: FormValues) => {
    console.log("Received values of form:", values);
    api.success({
      message: "Success",
      description: (
        <Context.Consumer>
          {({ name }) => `Form submitted successfully from ${name}!`}
        </Context.Consumer>
      ),
      placement: "top",
      duration: 3,
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
    api.error({
      message: "Error",
      description: (
        <Context.Consumer>
          {({ name }) => `Please correct the form errors in ${name}.`}
        </Context.Consumer>
      ),
      placement: "top",
      duration: 3,
    });
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            User Information Form
          </h2>
          <Form
            form={form}
            name="basic"
            layout="vertical" // Use vertical layout for better readability
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* Name Field */}
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Full Name</span>
              }
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                placeholder="Enter your full name"
                className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Email Address</span>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </Form.Item>

            {/* Phone Number Field (Optional) */}
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Phone Number</span>
              }
              name="phoneNumber"
              rules={[
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number!",
                },
              ]}
            >
              <Input
                placeholder="Enter your phone number (optional)"
                className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </Form.Item>

            {/* Address Field (TextArea) */}
            <Form.Item
              label={<span className="font-medium text-gray-700">Address</span>}
              name="address"
            >
              <Input.TextArea
                rows={3}
                placeholder="Enter your address"
                className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </Form.Item>

            {/* Save Button */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full rounded-md py-2 px-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Save Information
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Context.Provider>
  );
};

export default App;
