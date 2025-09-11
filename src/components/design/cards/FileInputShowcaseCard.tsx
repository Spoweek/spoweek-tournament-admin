import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import FileInputAdapter, { FILE_TYPE_PRESETS } from '../../../components/common/inputs/FileInputAdapter';
import { colors, typography, spacing } from '../../../components/common';

const FileInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [fileValues, setFileValues] = useState({
    singleFile: null,
    multipleFiles: null,
    imageFiles: null,
    documentFiles: null,
    floating: null,
    pill: null,
  });

  // Internal handler
  const handleFileChange = (key: string) => (value: any) => {
    console.log('File changed:', key, value);
    setFileValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>File Input Components</Text>
      
      {/* Single File Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Single File Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Single File"
            value={fileValues.singleFile}
            onChange={handleFileChange('singleFile')}
            InputComponent={FileInputAdapter}
            id="showcase-single-file"
            name="showcase-single-file"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Custom Placeholder"
            value={fileValues.singleFile}
            onChange={handleFileChange('singleFile')}
            InputComponent={FileInputAdapter}
            inputProps={{ placeholder: 'Please choose an image' }}
            id="showcase-custom-placeholder-file"
            name="showcase-custom-placeholder-file"
          />
        </View>
      </View>
      
      {/* Multiple File Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Multiple File Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Multiple Files"
            value={fileValues.multipleFiles}
            onChange={handleFileChange('multipleFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ allowMultiple: true }}
            id="showcase-multiple-files"
            name="showcase-multiple-files"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Multiple Files (Max 3)"
            value={fileValues.multipleFiles}
            onChange={handleFileChange('multipleFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              allowMultiple: true, 
              maxFiles: 3,
              placeholder: 'Choose up to 3 files'
            }}
            id="showcase-multiple-files-max3"
            name="showcase-multiple-files-max3"
          />
        </View>
      </View>
      
      {/* File Type Filters */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>File Type Filters</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Images Only (Preset)"
            value={fileValues.imageFiles}
            onChange={handleFileChange('imageFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: 'images',
              placeholder: 'Please choose an image'
            }}
            id="showcase-images-only-file"
            name="showcase-images-only-file"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Documents Only (Preset)"
            value={fileValues.documentFiles}
            onChange={handleFileChange('documentFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: 'documents',
              placeholder: 'Please choose a document'
            }}
            id="showcase-documents-only-file"
            name="showcase-documents-only-file"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Excel Files (Preset)"
            value={fileValues.documentFiles}
            onChange={handleFileChange('documentFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: 'excel',
              placeholder: 'Please choose an Excel file'
            }}
            id="showcase-excel-files"
            name="showcase-excel-files"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="ZIP Files (Preset)"
            value={fileValues.documentFiles}
            onChange={handleFileChange('documentFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: 'zip',
              placeholder: 'Please choose a ZIP file'
            }}
            id="showcase-zip-files"
            name="showcase-zip-files"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Text Files (Preset)"
            value={fileValues.documentFiles}
            onChange={handleFileChange('documentFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: 'text',
              placeholder: 'Please choose a text file'
            }}
            id="showcase-text-files"
            name="showcase-text-files"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Custom MIME Types"
            value={fileValues.documentFiles}
            onChange={handleFileChange('documentFiles')}
            InputComponent={FileInputAdapter}
            inputProps={{ 
              accept: ['application/json', 'application/xml'],
              placeholder: 'Please choose a JSON or XML file'
            }}
            id="showcase-custom-mime-files"
            name="showcase-custom-mime-files"
          />
        </View>
      </View>
      
      {/* Styling Variants */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Styling Variants</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating File Input"
            value={fileValues.floating}
            onChange={handleFileChange('floating')}
            inline={true}
            InputComponent={FileInputAdapter}
            id="showcase-floating-file-input"
            name="showcase-floating-file-input"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill File Input"
            value={fileValues.pill}
            onChange={handleFileChange('pill')}
            borderRadius="full"
            InputComponent={FileInputAdapter}
            inputProps={{ placeholder: 'Choose files' }}
            id="showcase-pill-file-input"
            name="showcase-pill-file-input"
          />
        </View>
      </View>
      
      {/* Fixed Width Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Fixed Width Examples</Text>
        
        <View style={styles.inputField}>
          <View style={{ width: 300 }}>
            <LabeledField
              label="300px Width"
              value={fileValues.singleFile}
              onChange={handleFileChange('singleFile')}
              InputComponent={FileInputAdapter}
              id="showcase-300px-width-file"
              name="showcase-300px-width-file"
            />
          </View>
        </View>
        
        <View style={styles.inputField}>
          <View style={{ width: 400 }}>
            <LabeledField
              label="400px Width (Pill)"
              value={fileValues.pill}
              onChange={handleFileChange('pill')}
              borderRadius="full"
              InputComponent={FileInputAdapter}
              id="showcase-400px-width-pill-file"
              name="showcase-400px-width-pill-file"
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  showcaseCard: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  subsectionTitle: {
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  inputField: {
    marginBottom: spacing.md,
  },
});

export default FileInputShowcaseCard;
