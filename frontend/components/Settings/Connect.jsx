import { useState, useCallback } from 'react';
import { Modal, Text, TextField, AccountConnection, Link } from '@shopify/polaris';

export default function Connect() {
  const [connected, setConnected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = useCallback(() => {
    if (!connected) {
      setModalOpen(true); // Open the modal when the connect button is clicked and there's no connection
    } else {
      setConnected(false); // Disconnect if already connected
    }
  }, [connected]);

  const toggleModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen]);

  const handleSubmit = useCallback(() => {
    // Here you would handle the form submission, e.g., by validating the input and then connecting the account
    console.log('Form submitted', email, password);
    setConnected(true);
    setModalOpen(false);
  }, [email, password]);

  const accountName = connected ? 'Jane Appleseed' : '';
  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <Text>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="https://example.com">terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </Text>
  );

  const modalMarkup = (
    <Modal
      open={modalOpen}
      onClose={toggleModal}
      title="Connect to Example App"
      primaryAction={{
        content: 'Connect',
        onAction: handleSubmit,
      }}
    >
      <Modal.Section>
        <TextField
          label="Email"
          value={email}
          onChange={(value) => setEmail(value)}
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          autoComplete="current-password"
        />
      </Modal.Section>
    </Modal>
  );

  return (
    <div>
      {modalMarkup}
      <AccountConnection
        accountName={accountName}
        connected={connected}
        title="Example App"
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        details={details}
        termsOfService={terms}
      />
    </div>
  );
}
