import Header from '../components/Header';
import CourseProvider from '../features/courses/components/CourseProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function CoursePage() {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const initialOptions = {
    clientId: clientId,
    'enable-funding': 'paylater,venmo',
    'data-sdk-integration-source': 'integrationbuilder_sc',
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Header />
      <CourseProvider />
    </PayPalScriptProvider>
  );
}
