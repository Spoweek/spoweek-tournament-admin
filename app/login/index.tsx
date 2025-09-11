import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { colors, typography } from '../../src/components/common';
import { useAuth } from '../../src/context/AuthContext';
import { LabeledField, EmailInputAdapter, PasswordInputAdapter } from '../../src/components/common/inputs';
import { PrimaryButton } from '../../src/components/common/buttons';
import Card from '../../src/components/common/Card';
import Logo from '../../src/components/common/Logo';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Debug logging
  console.log('LoginScreen render:', { email, password, loading, error, success });

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        setSuccess('Login successful!');
        // Navigation will be handled by the AuthContext state change
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotId = (): void => {
    Alert.alert('Forgot ID', 'Please contact your administrator to recover your ID.');
  };

  const handleForgotPassword = (): void => {
    Alert.alert('Forgot Password', 'Please contact your administrator to reset your password.');
  };

  const handleKeyPress = (event: any): void => {
    if (event.nativeEvent.key === 'Enter') {
      handleLogin();
    } 
  };

  return (
    <View style={styles.container}>
      <Logo 
        height={100}
        style={styles.logo}
      />
      
      <Card 
        width="100%" 
        padding={40}
        style={styles.card}
      >
        <Text style={[typography.h2, styles.title]}>로그인</Text>
        
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={[typography.error, styles.errorText]}>{error}</Text>
          </View>
        )}
        
        {success !== '' && (
          <View style={styles.successContainer}>
            <Text style={[typography.success, styles.successText]}>{success}</Text>
          </View>
        )}
        
        <LabeledField
          label="Email"
          inline={true}
          value={email}
          borderRadius="full"
          onChange={setEmail}
          placeholder="Enter your email"
          InputComponent={EmailInputAdapter}
          doLiveValidation={true}
          inputProps={{
            onKeyPress: handleKeyPress
          }}
        />
        
        <LabeledField
          label="Password"
          inline={true}
          value={password}
          borderRadius="full"
          onChange={setPassword}
          placeholder="Enter your password"
          InputComponent={PasswordInputAdapter}
          doLiveValidation={false}
          inputProps={{
            showPasswordToggle: true,
            onKeyPress: handleKeyPress
          }}
        />
        
        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={handleForgotId} style={styles.forgotLink}>
            <Text style={[typography.link, styles.forgotText]}>Forgot ID?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
            <Text style={[typography.link, styles.forgotText]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            borderRadius="full"
            style={styles.loginButton}
          >
            로그인
          </PrimaryButton>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 600,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  card: {
    width: 600,
    maxWidth: Platform.OS === 'web' ? '100vw' as any : '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
  },
  errorContainer: {
    backgroundColor: colors.error[100],
    borderColor: colors.error[300],
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: colors.success[100],
    borderColor: colors.success[300],
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    textAlign: 'center',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  forgotLink: {
    padding: 8,
  },
  forgotText: {
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'stretch',
    width: '100%',
  },
  loginButton: {
    minWidth: 200,
  },
});