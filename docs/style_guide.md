# Tag App Style Guide

## Design Philosophy

The Tag app follows a **minimalistic, community-focused design** that emphasizes creativity, connectivity, collaboration, and community. The design uses a **60:30:10 color rule** to create visual hierarchy and maintain consistency across the app.

## Color System

### 60:30:10 Color Rule

#### 60% - Dominant Color (Gentle Off-White)
- **Primary Background:** `#FEFEFE` - Clean, gentle off-white
- **Card/Modal Backgrounds:** `#FFFFFF` - Pure white for contrast
- **Input Field Backgrounds:** `#FFFFFF` - Clean input surfaces

#### 30% - Secondary Color (Warm Grays)
- **Primary Text:** `#374151` - Dark gray for optimal readability
- **Secondary Text:** `#6B7280` - Medium gray for subtitles and descriptions
- **Borders:** `#E5E7EB` - Light gray for subtle definition
- **Icon Backgrounds:** `#F8F9FA` - Light gray for subtle backgrounds
- **Disabled States:** `#F3F4F6` - Light gray for disabled elements

#### 10% - Accent Colors (Primary & Secondary)
- **Primary Accent:** `#030301` - Dark accent for sophistication and elegance
- **Secondary Accent:** `#7DE2D1` - Mint green for active video states
- **Interactive Elements:** Buttons, links, focus states, icons
- **Call-to-Action:** Primary buttons and important actions
- **Brand Elements:** Logo, key interactive components
- **Video Icons:** Mint green for active states (liked, favourited)

## Typography

### Font Hierarchy

#### Primary Headings
```css
fontSize: 32px
fontWeight: '700'
color: '#374151'
letterSpacing: -0.5
```

#### Secondary Headings
```css
fontSize: 24px
fontWeight: '700'
color: '#374151'
letterSpacing: -0.5
```

#### Body Text
```css
fontSize: 16px
fontWeight: '400'
color: '#374151'
```

#### Subtitle Text
```css
fontSize: 16px
fontWeight: '400'
color: '#6B7280'
letterSpacing: 0.3
```

#### Button Text
```css
fontSize: 18px
fontWeight: '700'
color: '#030301'
letterSpacing: 0.5
```

#### Link Text
```css
fontSize: 16px
fontWeight: '600'
color: '#030301'
```

#### Caption Text
```css
fontSize: 14px
fontWeight: '600'
color: '#030301'
letterSpacing: 0.3
```

## Spacing System

### Spacing Scale
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **xxl:** 40px

### Layout Spacing
- **Container Padding:** 32px (xl)
- **Section Margins:** 40px (xxl)
- **Element Spacing:** 24px (lg)
- **Form Spacing:** 16px (md)

## Component Styles

### Buttons

#### Primary Button
```css
backgroundColor: '#FFFFFF'
borderRadius: 16px
padding: 24px
borderWidth: 2px
borderColor: '#030301'
shadowColor: '#030301'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.2
shadowRadius: 12
elevation: 8
```

#### Button Accent Overlay
```css
position: 'absolute'
// top: -4,
// left: -4,
// right: -4,
// bottom: -4,
borderRadius: 20px
backgroundColor: 'transparent'
borderWidth: 2px
borderColor: '#030301'
opacity: 0.3
shadowColor: '#030301'
shadowOffset: { width: 0, height: 0 }
shadowOpacity: 0.4
shadowRadius: 15
```

#### Secondary Button
```css
backgroundColor: '#F9FAFB'
borderRadius: 12px
padding: 24px
borderWidth: 2px
borderColor: '#E5E7EB'
```

#### Disabled Button
```css
backgroundColor: '#F3F4F6'
borderColor: '#D1D5DB'
shadowOpacity: 0.1
```

### Input Fields

#### Standard Input
```css
backgroundColor: '#FFFFFF'
borderRadius: 16px
padding: 24px
fontSize: 16px
color: '#374151'
borderWidth: 2px
borderColor: '#E5E7EB'
shadowColor: '#000'
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.05
shadowRadius: 8
elevation: 2
```

#### Input Focus State
```css
borderColor: '#030301'
shadowColor: '#030301'
shadowOpacity: 0.3
shadowRadius: 8
```

#### Placeholder Text
```css
color: '#9CA3AF'
```

### Cards and Modals

#### Modal Background
```css
backgroundColor: '#FFFFFF'
borderRadius: 20px
padding: 40px
borderWidth: 1px
borderColor: '#E5E7EB'
shadowColor: '#030301'
shadowOffset: { width: 0, height: 8 }
shadowOpacity: 0.15
shadowRadius: 20
elevation: 12
```

#### Card Background
```css
backgroundColor: '#FFFFFF'
borderRadius: 16px
padding: 16px
shadowColor: '#000'
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 4
elevation: 3
```

## Icon System

### Community Icons
- **Primary Icon:** Link symbol (🔗) representing connectivity
- **Size:** 40px for main icons, 24px for modal icons
- **Color:** `#030301` (dark accent)
- **Background:** `#F8F9FA` (light gray)

### Icon Container
```css
width: 80px
height: 80px
borderRadius: 40px
backgroundColor: '#F8F9FA'
borderWidth: 2px
borderColor: '#030301'
shadowColor: '#030301'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.2
shadowRadius: 12
elevation: 8
```

### Video Interaction Icons
- **Inactive State:** White (`#FFFFFF`) for outline icons
- **Active State:** Mint green (`#7DE2D1`) for filled icons
- **Size:** 28px for video overlay icons
- **Glow Effect:** Mint green shadow for active states
- **Usage:** Like, favourite, and other video interaction buttons

#### Video Icon Active State
```css
color: '#7DE2D1'
textShadowColor: 'rgba(125, 226, 209, 0.5)'
textShadowOffset: { width: 0, height: 0 }
textShadowRadius: 4
```

#### Video Icon Inactive State
```css
color: '#FFFFFF'
textShadowColor: 'rgba(0, 0, 0, 0.9)'
textShadowOffset: { width: 0, height: 1 }
textShadowRadius: 4
```

## Layout Principles

### Container Structure
- **Main Container:** Full height with gentle off-white background
- **Content Area:** Centered with proper padding
- **Form Elements:** Full width with consistent spacing

### Visual Hierarchy
1. **Primary:** Large headings (32px)
2. **Secondary:** Subheadings (24px)
3. **Body:** Regular text (16px)
4. **Supporting:** Captions and links (14px)

### Spacing Rules
- **Vertical Rhythm:** Consistent 24px spacing between elements
- **Form Spacing:** 16px between form elements
- **Section Spacing:** 40px between major sections
- **Container Padding:** 32px horizontal padding

## Interactive States

### Hover States
- **Buttons:** Subtle shadow increase
- **Links:** Color intensity increase
- **Inputs:** Border color change to accent

### Focus States
- **Inputs:** Dark accent border with glow effect
- **Buttons:** Enhanced shadow and border
- **Links:** Underline or color change
- **Video Icons:** Mint green for active states

### Disabled States
- **Opacity:** Reduced to 0.6
- **Colors:** Muted gray tones
- **Interactions:** No hover or focus effects

## Accessibility

### Color Contrast
- **Text on White:** Minimum 4.5:1 ratio
- **Interactive Elements:** Clear visual distinction
- **Focus Indicators:** High contrast focus rings

### Touch Targets
- **Minimum Size:** 44px x 44px
- **Spacing:** 8px minimum between touch targets
- **Button Padding:** 24px for comfortable touch

## Implementation Guidelines

### React Native StyleSheet
```javascript
const styles = StyleSheet.create({
  // Use consistent naming conventions
  container: { /* styles */ },
  primaryButton: { /* styles */ },
  inputField: { /* styles */ },
  // etc.
});
```

### Color Constants
```javascript
const colors = {
  primary: '#FEFEFE',
  secondary: '#374151',
  accent: '#030301',
  accentSecondary: '#7DE2D1',
  // etc.
};
```

### Spacing Constants
```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};
```

## Brand Voice

### Messaging Tone
- **Community-focused:** "Connect. Collaborate. Create."
- **Welcoming:** "Welcome Back"
- **Inclusive:** Emphasize connection and collaboration
- **Creative:** Highlight creativity and innovation

### Visual Personality
- **Minimalistic:** Clean, uncluttered design
- **Energetic:** Electric pink accents create energy
- **Professional:** Gentle off-white base maintains professionalism
- **Community-oriented:** Link icons and collaborative messaging

## Usage Examples

### Screen Layout
```javascript
<View style={styles.container}>
  <View style={styles.content}>
    <Text style={styles.title}>Screen Title</Text>
    <Text style={styles.subtitle}>Supporting text</Text>
    {/* Content */}
  </View>
</View>
```

### Form Implementation
```javascript
<View style={styles.inputWrapper}>
  <TextInput style={styles.input} />
  <View style={styles.inputFocus} />
</View>
```

### Button Implementation
```javascript
<TouchableOpacity style={styles.primaryButton}>
  <Text style={styles.buttonText}>Action</Text>
</TouchableOpacity>
```

This style guide ensures consistent implementation of the Tag app's design system across all screens and components, maintaining the community-focused, creative, and minimalistic aesthetic.
