import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Logo from '../../components/common/Logo';
import Card from '../../components/common/Card';
import ThemedText from '../../components/common/ThemedText';
import ThemedTextInput from '../../components/common/ThemedTextInput';
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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
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
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotId = () => {
    Alert.alert('Forgot ID', 'Please contact your administrator to recover your ID.');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Please contact your administrator to reset your password.');
  };

  const handleKeyPress = (event) => {
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
        
        {/* Color Palette Display - Temporary for Testing */}
        <Card 
          width="100%" 
          padding={16}
          style={styles.colorPaletteCard}
        >
          <ThemedText style={[typography.h3, styles.colorPaletteTitle]}>Color Palette</ThemedText>
          
          {/* Primary Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Primary</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>primary.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>primary.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>primary.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>primary.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Secondary Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Secondary</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>secondary.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>secondary.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>secondary.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>secondary.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Success Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Success</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>success.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>success.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>success.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>success.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Warning Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Warning</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>warning.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>warning.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>warning.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>warning.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Error Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Error</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>error.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>error.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>error.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>error.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Neutral Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>Neutral</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[100] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>neutral.100</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[300] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>neutral.300</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[500] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>neutral.500</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[700] }]}>
                <ThemedText style={[typography.caption, styles.colorLabel]}>neutral.700</ThemedText>
              </View>
            </View>
          </View>
          
          {/* ThemedText Colors */}
          <View style={styles.colorSection}>
            <ThemedText style={[typography.label, styles.colorSectionTitle]}>ThemedText</ThemedText>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.primary }]}>
                <ThemedText style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.primary</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.secondary }]}>
                <ThemedText style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.secondary</ThemedText>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.tertiary }]}>
                <ThemedText style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.tertiary</ThemedText>
              </View>
            </View>
          </View>
        </Card>
        
        {/* Button Showcase - Temporary for Testing */}
        <Card 
          width="100%" 
          padding={16}
          style={styles.buttonShowcaseCard}
        >
          <ThemedText style={[typography.h3, styles.buttonShowcaseTitle]}>Button Components</ThemedText>
          
          {/* Light Rounded Buttons */}
          <View style={styles.buttonSection}>
            <ThemedText style={[typography.label, styles.buttonSectionTitle]}>Light Rounded</ThemedText>
            <View style={styles.buttonRow}>
              <PrimaryButton onPress={() => Alert.alert('Primary')}>
                Primary
              </PrimaryButton>
              <SecondaryButton onPress={() => Alert.alert('Secondary')}>
                Secondary
              </SecondaryButton>
            </View>
            <View style={styles.buttonRow}>
              <SuccessButton onPress={() => Alert.alert('Success')}>
                Success
              </SuccessButton>
              <WarningButton onPress={() => Alert.alert('Warning')}>
                Warning
              </WarningButton>
            </View>
            <View style={styles.buttonRow}>
              <DangerButton onPress={() => Alert.alert('Danger')}>
                Danger
              </DangerButton>
            </View>
          </View>
          
          {/* Full Rounded (Pill) Buttons */}
          <View style={styles.buttonSection}>
            <ThemedText style={[typography.label, styles.buttonSectionTitle]}>Full Rounded (Pill)</ThemedText>
            <View style={styles.buttonRow}>
              <PrimaryButton borderRadius="full" onPress={() => Alert.alert('Primary Pill')}>
                Primary
              </PrimaryButton>
              <SecondaryButton borderRadius="full" onPress={() => Alert.alert('Secondary Pill')}>
                Secondary
              </SecondaryButton>
            </View>
            <View style={styles.buttonRow}>
              <SuccessButton borderRadius="full" onPress={() => Alert.alert('Success Pill')}>
                Success
              </SuccessButton>
              <WarningButton borderRadius="full" onPress={() => Alert.alert('Warning Pill')}>
                Warning
              </WarningButton>
            </View>
            <View style={styles.buttonRow}>
              <DangerButton borderRadius="full" onPress={() => Alert.alert('Danger Pill')}>
                Danger
              </DangerButton>
            </View>
          </View>
          
          {/* Different Sizes */}
          <View style={styles.buttonSection}>
            <ThemedText style={[typography.label, styles.buttonSectionTitle]}>Different Sizes</ThemedText>
            <View style={styles.buttonRow}>
              <PrimaryButton size="small" onPress={() => Alert.alert('Small')}>
                Small
              </PrimaryButton>
              <PrimaryButton size="medium" onPress={() => Alert.alert('Medium')}>
                Medium
              </PrimaryButton>
              <PrimaryButton size="large" onPress={() => Alert.alert('Large')}>
                Large
              </PrimaryButton>
            </View>
          </View>
          
          {/* Disabled and Loading States */}
          <View style={styles.buttonSection}>
            <ThemedText style={[typography.label, styles.buttonSectionTitle]}>States</ThemedText>
            <View style={styles.buttonRow}>
              <PrimaryButton disabled onPress={() => Alert.alert('Disabled')}>
                Disabled
              </PrimaryButton>
              <PrimaryButton loading onPress={() => Alert.alert('Loading')}>
                Loading
              </PrimaryButton>
            </View>
          </View>
        </Card>
        
        <Card 
          width="100%" 
          padding={40}
          style={styles.loginCard}
        >
          <ThemedText style={[globalStyles.text, typography.h2, styles.title]}>로그인</ThemedText>
          
          {error ? (
            <View style={styles.errorContainer}>
              <ThemedText style={[typography.error, styles.errorThemedText]}>{error}</ThemedText>
            </View>
          ) : null}
          
          {success ? (
            <View style={styles.successContainer}>
              <ThemedText style={[typography.success, styles.successThemedText]}>{success}</ThemedText>
            </View>
          ) : null}
          
          <ThemedTextInput
            style={[typography.input, styles.input]}
            placeholder="Email"
            value={email}
            onChangeThemedText={(text) => {
              setEmail(text);
              if (error) setError('');
            }}
            onKeyPress={handleKeyPress}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => {
              // Focus next input (password)
            }}
          />
          
          <ThemedTextInput
            style={[typography.input, styles.input]}
            placeholder="Password"
            value={password}
            onChangeThemedText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            onKeyPress={handleKeyPress}
            secureThemedTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          
          <View style={styles.forgotLinksContainer}>
            <TouchableOpacity onPress={handleForgotId} style={styles.forgotLink}>
              <ThemedText style={[typography.link, styles.forgotLinkThemedText]}>Forgot ID</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
              <ThemedText style={[typography.link, styles.forgotLinkThemedText]}>Forgot Password</ThemedText>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={[typography.button, styles.loginButtonThemedText]}>로그인</ThemedText>
            )}
          </TouchableOpacity>
        </Card>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: '100%',
  },
  loginCard: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonThemedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorThemedText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  successThemedText: {
    color: '#2E7D32',
    fontSize: 14,
    textAlign: 'center',
  },
  forgotLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  forgotLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  forgotLinkThemedText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Color Palette Styles - Temporary for Testing
  colorPaletteCard: {
    marginBottom: 16,
  },
  colorPaletteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  colorSection: {
    marginBottom: 12,
  },
  colorSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 60,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  // Button Showcase Styles - Temporary for Testing
  buttonShowcaseCard: {
    marginBottom: 16,
  },
  buttonShowcaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  buttonSection: {
    marginBottom: 20,
  },
  buttonSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
});
