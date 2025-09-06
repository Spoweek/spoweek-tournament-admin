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
        
        {/* Input Showcase - Temporary for Testing */}
        <Card 
          width="100%" 
          padding={16}
          style={styles.inputShowcaseCard}
        >
          <Text style={[typography.h3, styles.inputShowcaseTitle]}>Input Components</Text>
          
          {/* Above Label Inputs */}
          <View style={styles.inputSection}>
            <Text style={[typography.h4, styles.subsectionTitle]}>Above Label Inputs</Text>
            
            <LabeledField
              label="Standard Input"
              value=""
              onChange={() => {}}
              placeholder="Enter text here"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Pill Input"
              value=""
              onChange={() => {}}
              roundness="pill"
              placeholder="Rounded corners"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Small Input"
              value=""
              onChange={() => {}}
              roundness="small"
              placeholder="Compact size"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Large Input"
              value=""
              onChange={() => {}}
              roundness="small"
              placeholder="Larger size"
              InputComponent={TextInputAdapter}
            />
          </View>
          
          {/* Inside Label Inputs */}
          <View style={styles.inputSection}>
            <Text style={[typography.h4, styles.subsectionTitle]}>Inside Label Inputs (Floating)</Text>
            
            <LabeledField
              label="Floating Label"
              value=""
              onChange={() => {}}
              inline={true}
              placeholder="Enter text here"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Pill Floating"
              value=""
              onChange={() => {}}
              inline={true}
              roundness="pill"
              placeholder="Rounded corners"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Small Floating asdasd asdsa das dasds ads"
              value=""
              onChange={() => {}}
              inline={true}
              roundness="small"
              placeholder="Compact size"
              InputComponent={TextInputAdapter}
            />
            
            <LabeledField
              label="Large Floating"
              value=""
              onChange={() => {}}
              inline={true}
              roundness="small"
              placeholder="Larger size"
              InputComponent={TextInputAdapter}
            />
          </View>
        </Card>
        
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
  
  // Color palette styles
  colorPaletteCard: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 800,
  },
  colorPaletteTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  colorSection: {
    marginBottom: 16,
  },
  colorSectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 60,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  colorLabel: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Button showcase styles
  buttonShowcaseCard: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 800,
  },
  buttonShowcaseTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonSection: {
    marginBottom: 20,
  },
  buttonSectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  
  // Input showcase styles
  inputShowcaseCard: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 800,
  },
  inputShowcaseTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  
  // Login form styles
  loginCard: {
    width: '100%',
    maxWidth: 400,
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
