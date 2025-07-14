import { Form, Input, Button, message } from "antd";

const App = () => {
  const [form] = Form.useForm();

  // Define the type for form values
  interface FormValues {
    fullName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
  }

  // Function to handle form submission
  const onFinish = (values: FormValues) => {
    console.log("Received values of form:", values);
    message.success("Form submitted successfully!");
    // Here you would typically send the 'values' to your backend API
    // e.g., axios.post('/api/save-data', values)
    //   .then(response => {
    //     message.success('Data saved!');
    //   })
    //   .catch(error => {
    //     message.error('Failed to save data.');
    //   });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
    message.error("Please correct the form errors.");
  };

  return (
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
            label={<span className="font-medium text-gray-700">Full Name</span>}
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
              { type: "email", message: "Please enter a valid email address!" },
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
  );
};

export default App;
