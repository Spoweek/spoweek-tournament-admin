import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Text,
  TextInput
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
          <Text style={[typography.h3, styles.colorPaletteTitle]}>Color Palette</Text>
          
          {/* Primary Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Primary</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>primary.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>primary.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>primary.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primary[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>primary.700</Text>
              </View>
            </View>
          </View>
          
          {/* Secondary Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Secondary</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>secondary.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>secondary.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>secondary.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>secondary.700</Text>
              </View>
            </View>
          </View>
          
          {/* Success Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Success</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>success.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>success.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>success.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.success[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>success.700</Text>
              </View>
            </View>
          </View>
          
          {/* Warning Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Warning</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>warning.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>warning.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>warning.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.warning[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>warning.700</Text>
              </View>
            </View>
          </View>
          
          {/* Error Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Error</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>error.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>error.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>error.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.error[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>error.700</Text>
              </View>
            </View>
          </View>
          
          {/* Neutral Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Neutral</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[100] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>neutral.100</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[300] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>neutral.300</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[500] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>neutral.500</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[700] }]}>
                <Text style={[typography.caption, styles.colorLabel]}>neutral.700</Text>
              </View>
            </View>
          </View>
          
          {/* Text Colors */}
          <View style={styles.colorSection}>
            <Text style={[typography.label, styles.colorSectionTitle]}>Text</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.primary }]}>
                <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.primary</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.secondary }]}>
                <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.secondary</Text>
              </View>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text.tertiary }]}>
                <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.tertiary</Text>
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
          <Text style={[typography.h3, styles.buttonShowcaseTitle]}>Button Components</Text>
          
          {/* Light Rounded Buttons */}
          <View style={styles.buttonSection}>
            <Text style={[typography.label, styles.buttonSectionTitle]}>Light Rounded</Text>
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
            <Text style={[typography.label, styles.buttonSectionTitle]}>Full Rounded (Pill)</Text>
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
            <Text style={[typography.label, styles.buttonSectionTitle]}>Different Sizes</Text>
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
            <Text style={[typography.label, styles.buttonSectionTitle]}>States</Text>
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
          <Text style={[globalStyles.text, typography.h2, styles.title]}>로그인</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={[typography.error, styles.errorText]}>{error}</Text>
            </View>
          ) : null}
          
          {success ? (
            <View style={styles.successContainer}>
              <Text style={[typography.success, styles.successText]}>{success}</Text>
            </View>
          ) : null}
          
          <TextInput
            style={[typography.input, styles.input]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
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
          
          <TextInput
            style={[typography.input, styles.input]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            onKeyPress={handleKeyPress}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          
          <View style={styles.forgotLinksContainer}>
            <TouchableOpacity onPress={handleForgotId} style={styles.forgotLink}>
              <Text style={[typography.link, styles.forgotLinkText]}>Forgot ID</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
              <Text style={[typography.link, styles.forgotLinkText]}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          
          <PrimaryButton 
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            borderRadius="full"
          >
            로그인
          </PrimaryButton>
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
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
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
  successText: {
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
  forgotLinkText: {
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
