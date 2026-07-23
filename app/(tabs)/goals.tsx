import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useTheme } from '../../context/ThemeContext';
import { ProgressBar } from '../../components/ProgressBar';
import { Target, Plus, ShieldCheck, Plane, Laptop, TrendingUp } from 'lucide-react-native';
import { MintPalette } from '../../constants/theme';

export default function GoalsScreen() {
  const { colors } = useTheme();
  const {
    savingsGoals,
    monthlySavingsTarget,
    currencySymbol,
    getLeftForSaving,
    addSavingsGoal,
    updateSavingsProgress,
    deleteSavingsGoal,
    setMonthlySavingsTarget,
  } = useFinanceStore();

  const leftForSaving = getLeftForSaving();
  const targetProgress = monthlySavingsTarget > 0 ? Math.min(leftForSaving / monthlySavingsTarget, 1) : 0;

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const [showTargetModal, setShowTargetModal] = useState(false);
  const [newTargetInput, setNewTargetInput] = useState(monthlySavingsTarget.toString());

  const fmt = (val: number) =>
    `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const handleCreateGoal = () => {
    const target = parseFloat(goalTarget);
    if (goalTitle.trim() && !isNaN(target) && target > 0) {
      addSavingsGoal({ title: goalTitle.trim(), targetAmount: target, iconName: 'Target' });
      setGoalTitle('');
      setGoalTarget('');
      setShowGoalModal(false);
    }
  };

  const handleSaveTarget = () => {
    const val = parseFloat(newTargetInput);
    if (!isNaN(val) && val > 0) {
      setMonthlySavingsTarget(val);
    }
    setShowTargetModal(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.scroll}>
      {/* Monthly Savings Target Card */}
      <Pressable
        style={[styles.targetCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        onPress={() => { setNewTargetInput(monthlySavingsTarget.toString()); setShowTargetModal(true); }}
      >
        <View style={styles.targetHeader}>
          <View style={[styles.targetIconBadge, { backgroundColor: colors.primaryLight }]}>
            <TrendingUp size={20} color={colors.primary} />
          </View>
          <View style={styles.targetMeta}>
            <Text style={[styles.targetTitle, { color: colors.text }]}>Monthly Savings Target</Text>
            <Text style={[styles.targetSub, { color: colors.textSecondary }]}>
              {fmt(Math.max(0, leftForSaving))} of {fmt(monthlySavingsTarget)} saved
            </Text>
          </View>
        </View>
        <View style={styles.targetProgress}>
          <ProgressBar progress={targetProgress} color={colors.primary} height={10} showLabel />
        </View>
      </Pressable>

      {/* Savings Goals */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Savings Goals</Text>
        <Pressable style={styles.addBtn} onPress={() => setShowGoalModal(true)}>
          <Plus size={16} color={colors.primary} />
          <Text style={[styles.addBtnText, { color: colors.primary }]}>New Goal</Text>
        </Pressable>
      </View>

      {savingsGoals.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Target size={32} color={colors.textMuted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No goals yet</Text>
          <Text style={[styles.emptySub, { color: colors.textMuted }]}>Create your first savings goal.</Text>
        </View>
      ) : (
        savingsGoals.map((goal) => {
          const ratio = goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0;
          const percent = Math.min(100, Math.round(ratio * 100));

          return (
            <View key={goal.id} style={[styles.goalCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.goalHeader}>
                <View style={[styles.goalIconBadge, { backgroundColor: colors.primaryLight }]}>
                  <Target size={20} color={colors.primary} />
                </View>
                <View style={styles.goalMeta}>
                  <Text style={[styles.goalTitle, { color: colors.text }]}>{goal.title}</Text>
                  <Text style={[styles.goalSub, { color: colors.textSecondary }]}>
                    {fmt(goal.currentAmount)} of {fmt(goal.targetAmount)} ({percent}%)
                  </Text>
                </View>
              </View>
              <View style={styles.goalProgress}>
                <ProgressBar progress={ratio} color={colors.primary} height={10} />
              </View>
              <View style={styles.goalActions}>
                <Pressable
                  style={[styles.goalActionBtn, { backgroundColor: colors.primaryLight }]}
                  onPress={() => updateSavingsProgress(goal.id, 50)}
                >
                  <Text style={[styles.goalActionText, { color: colors.primary }]}>+$50</Text>
                </Pressable>
                <Pressable
                  style={[styles.goalActionBtn, { backgroundColor: colors.primaryLight }]}
                  onPress={() => updateSavingsProgress(goal.id, 100)}
                >
                  <Text style={[styles.goalActionText, { color: colors.primary }]}>+$100</Text>
                </Pressable>
                <Pressable
                  style={[styles.goalActionBtn, { backgroundColor: colors.primaryLight }]}
                  onPress={() => updateSavingsProgress(goal.id, 250)}
                >
                  <Text style={[styles.goalActionText, { color: colors.primary }]}>+$250</Text>
                </Pressable>
                <Pressable
                  style={[styles.goalActionBtn, { backgroundColor: colors.dangerBg }]}
                  onPress={() => deleteSavingsGoal(goal.id)}
                >
                  <Text style={[styles.goalActionText, { color: colors.danger }]}>Delete</Text>
                </Pressable>
              </View>
            </View>
          );
        })
      )}

      {/* Create Goal Modal */}
      <Modal visible={showGoalModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>New Savings Goal</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
              placeholder="Goal title (e.g. Vacation)"
              placeholderTextColor={colors.inputPlaceholder}
              value={goalTitle}
              onChangeText={setGoalTitle}
            />
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
              placeholder="Target amount ($)"
              placeholderTextColor={colors.inputPlaceholder}
              keyboardType="numeric"
              value={goalTarget}
              onChangeText={setGoalTarget}
            />
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalBtn, { backgroundColor: colors.surfaceSecondary }]} onPress={() => setShowGoalModal(false)}>
                <Text style={[styles.modalBtnText, { color: colors.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, { backgroundColor: colors.primary }]} onPress={handleCreateGoal}>
                <Text style={[styles.modalBtnText, { color: '#FFFFFF' }]}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Monthly Target Modal */}
      <Modal visible={showTargetModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Monthly Savings Target</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
              placeholder="Amount ($)"
              placeholderTextColor={colors.inputPlaceholder}
              keyboardType="numeric"
              value={newTargetInput}
              onChangeText={setNewTargetInput}
            />
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalBtn, { backgroundColor: colors.surfaceSecondary }]} onPress={() => setShowTargetModal(false)}>
                <Text style={[styles.modalBtnText, { color: colors.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, { backgroundColor: colors.primary }]} onPress={handleSaveTarget}>
                <Text style={[styles.modalBtnText, { color: '#FFFFFF' }]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },

  targetCard: { borderRadius: 20, padding: 20, borderWidth: 1, marginBottom: 20 },
  targetHeader: { flexDirection: 'row', alignItems: 'center' },
  targetIconBadge: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  targetMeta: { flex: 1 },
  targetTitle: { fontSize: 16, fontWeight: '700' },
  targetSub: { fontSize: 13, marginTop: 2 },
  targetProgress: { marginTop: 16 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addBtnText: { fontSize: 13, fontWeight: '600' },

  emptyCard: { padding: 32, borderRadius: 16, alignItems: 'center', borderWidth: 1, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
  emptySub: { fontSize: 13, textAlign: 'center' },

  goalCard: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  goalHeader: { flexDirection: 'row', alignItems: 'center' },
  goalIconBadge: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  goalMeta: { flex: 1 },
  goalTitle: { fontSize: 15, fontWeight: '600' },
  goalSub: { fontSize: 12, marginTop: 2 },
  goalProgress: { marginTop: 14 },
  goalActions: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' },
  goalActionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  goalActionText: { fontSize: 13, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { borderRadius: 20, padding: 24, width: '100%', maxWidth: 360, borderWidth: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  modalInput: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, borderWidth: 1, marginBottom: 12 },
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  modalBtnText: { fontSize: 14, fontWeight: '700' },
});
