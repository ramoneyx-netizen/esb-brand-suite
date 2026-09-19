import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const colors = { bg: '#0B1220', card: '#121D31', muted: '#91A0B8', text: '#F4F7FB', accent: '#55D6BE', purple: '#9B8AFB' };

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [generated, setGenerated] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>ESB CREATIVE STUDIO</Text>
          <Text style={styles.title}>Build a brand people remember.</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>ES</Text></View>
      </View>

      <LinearGradient colors={['#203A55', '#17243A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroIcon}><Ionicons name="sparkles" size={22} color={colors.accent} /></View>
        <Text style={styles.heroTitle}>Your next big idea starts here.</Text>
        <Text style={styles.heroBody}>Use AI-powered tools to shape your identity, voice, and visual direction.</Text>
        <Pressable style={styles.primaryButton} onPress={() => setGenerated(true)}><Text style={styles.primaryText}>Create a brand</Text><Ionicons name="arrow-forward" size={17} color={colors.bg} /></Pressable>
      </LinearGradient>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Creative tools</Text><Text style={styles.seeAll}>View all</Text></View>
      <View style={styles.grid}>
        <ToolCard icon="color-palette-outline" label="Brand identity" tint={colors.accent} />
        <ToolCard icon="chatbubble-ellipses-outline" label="Voice & copy" tint={colors.purple} />
        <ToolCard icon="images-outline" label="Moodboard" tint="#F6B85B" />
        <ToolCard icon="logo-instagram" label="Social kit" tint="#F17A9A" />
      </View>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Quick AI brief</Text><Ionicons name="sparkles-outline" size={18} color={colors.accent} /></View>
      <View style={styles.briefCard}>
        <Text style={styles.briefLabel}>WHAT ARE YOU BUILDING?</Text>
        <TextInput value={prompt} onChangeText={setPrompt} placeholder="A sustainable coffee brand..." placeholderTextColor="#66758D" multiline style={styles.input} />
        <Pressable style={[styles.generateButton, !prompt && styles.disabled]} disabled={!prompt} onPress={() => setGenerated(true)}><Ionicons name="sparkles" size={16} color={colors.bg} /><Text style={styles.generateText}>Generate ideas</Text></Pressable>
        {generated && <Text style={styles.success}><Ionicons name="checkmark-circle" size={16} color={colors.accent} /> Your creative brief is ready to explore.</Text>}
      </View>

      <View style={styles.footer}><Text style={styles.footerText}>Made for ambitious brands</Text><Text style={styles.footerMark}>ESB</Text></View>
    </ScrollView>
  );
}

function ToolCard({ icon, label, tint }: { icon: keyof typeof Ionicons.glyphMap; label: string; tint: string }) {
  return <Pressable style={({ pressed }) => [styles.toolCard, pressed && { opacity: 0.75 }]}><View style={[styles.toolIcon, { backgroundColor: `${tint}20` }]}><Ionicons name={icon} size={23} color={tint} /></View><Text style={styles.toolLabel}>{label}</Text><Ionicons name="arrow-up-right" size={16} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg }, content: { padding: 24, paddingTop: 62, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26 }, eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 }, title: { color: colors.text, fontSize: 29, lineHeight: 34, fontWeight: '800', maxWidth: 280 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#253652', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: colors.text, fontWeight: '800' },
  hero: { borderRadius: 24, padding: 22, marginBottom: 30 }, heroIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#0B122080', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }, heroTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 8 }, heroBody: { color: '#B7C5D9', fontSize: 14, lineHeight: 21, marginBottom: 20 }, primaryButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.accent, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 }, primaryText: { color: colors.bg, fontWeight: '800', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800' }, seeAll: { color: colors.accent, fontSize: 13, fontWeight: '700' }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 }, toolCard: { width: '48%', minHeight: 125, backgroundColor: colors.card, borderRadius: 17, padding: 15, justifyContent: 'space-between' }, toolIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, toolLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
  briefCard: { backgroundColor: colors.card, borderRadius: 20, padding: 18 }, briefLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.1, marginBottom: 11 }, input: { color: colors.text, fontSize: 16, lineHeight: 23, minHeight: 72, textAlignVertical: 'top', marginBottom: 12 }, generateButton: { backgroundColor: colors.accent, borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }, disabled: { opacity: 0.45 }, generateText: { color: colors.bg, fontWeight: '800' }, success: { color: colors.accent, fontSize: 12, marginTop: 14 }, footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 34, alignItems: 'center' }, footerText: { color: colors.muted, fontSize: 12 }, footerMark: { color: colors.accent, fontSize: 15, fontWeight: '900', letterSpacing: 1 }
});
