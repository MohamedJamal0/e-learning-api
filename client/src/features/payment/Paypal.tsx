import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { ElearningApi } from '../../services/apiElearning';
import { useAuthContext } from '../authentication/context/authContext';
import toast from 'react-hot-toast';

function Paypal({
  onSuccess,
  courseId,
}: {
  onSuccess: () => void;
  courseId: string;
}) {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const initialOptions = {
    clientId: clientId,
    'enable-funding': 'paylater,venmo',
    'data-sdk-integration-source': 'integrationbuilder_sc',
  };

  const { user } = useAuthContext();

  return (
    <div className="App mt-4">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: 'rect',
            layout: 'vertical',
          }}
          disabled={!user || user?.role !== 'student'}
          createOrder={async () => {
            try {
              const { data: orderData } = await ElearningApi.post('/orders', {
                courseId: courseId,
              });

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              toast.error(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const { data: orderData } = await ElearningApi.post(
                `/orders/${data.orderID}/capture`,
                {
                  courseId: courseId,
                }
              );

              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                toast.success(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  'Capture result',
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                onSuccess();
              }
            } catch (error) {
              console.error(error);
              toast.error(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
