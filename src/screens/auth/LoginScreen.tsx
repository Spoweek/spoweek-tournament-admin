import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Text,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Logo from '../../components/common/Logo';
import Card from '../../components/common/Card';
import { globalStyles } from '../../components/common/GlobalStyles';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { 
  PrimaryButton, 
  SecondaryButton, 
  SuccessButton, 
  WarningButton, 
  DangerButton
} from '../../components/common/buttons';
import { LabeledField, TextInputAdapter } from '../../components/common/inputs';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { login } = useAuth();

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
    <AuthLayout>
      <View style={styles.loginContainer}>
        <Logo 
          height={100}
          style={{ marginBottom: 20 }} 
        />
        
        <Card 
          width="100%" 
          padding={40}
          style={styles.loginCard}
        >
          <Text style={[globalStyles.text, typography.h2, styles.title]}>로그인</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={[typography.error, styles.errorText]}>{error}</Text>
            </View>
          )}
          
          {success && (
            <View style={styles.successContainer}>
              <Text style={[typography.success, styles.successText]}>{success}</Text>
            </View>
          )}
          
          <LabeledField
            label="Email"
            inline={true}
            value={email}
            roundness="pill"
            onChange={setEmail}
            placeholder="Enter your email"
            InputComponent={TextInputAdapter}
            inputProps={{
              keyboardType: "email-address",
              autoCapitalize: "none",
              autoCorrect: false,
              onKeyPress: handleKeyPress
            }}
          />
          
          <LabeledField
            label="Password"
            inline={true}
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            InputComponent={TextInputAdapter}
            inputProps={{
              secureTextEntry: true,
              autoCapitalize: "none",
              autoCorrect: false,
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
              style={styles.loginButton}
            >
              로그인
            </PrimaryButton>
          </View>
        </Card>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Login form styles
  loginCard: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
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
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    minWidth: 200,
  },
});

export default LoginScreen;
