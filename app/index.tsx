import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { Baloo2_400Regular, Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import { Fredoka_500Medium, Fredoka_600SemiBold } from "@expo-google-fonts/fredoka";

const reactions = ["듣는 중", "좋았어요", "생각 많아짐", "다음 회차 기대"];

export default function HomeScreen() {
  const [loaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
  });

  const [mounted, setMounted] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState("작은 공부 습관");
  const [episodeTitle, setEpisodeTitle] = useState("이번 달 함께 들을 에피소드");
  const [thought, setThought] = useState("");
  const [friendNote, setFriendNote] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("듣는 중");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Podmate</Text>
            </View>
            <Text style={styles.title}>같이 듣고, 같이 적고, 같이 끝내기</Text>
            <Text style={styles.subtitle}>
              매달 팟캐스트를 바꾸면서 친구랑 감상평을 공유하는{"\n"}심플하고 귀여운 습관 앱
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>이번 달 팟캐스트</Text>
            <View style={styles.card}>
              <Text style={styles.label}>팟캐스트 제목</Text>
              <TextInput
                value={podcastTitle}
                onChangeText={setPodcastTitle}
                placeholder="예: 작은 공부 습관"
                placeholderTextColor="#B6A79D"
                style={styles.input}
              />

              <Text style={styles.label}>에피소드 이름</Text>
              <TextInput
                value={episodeTitle}
                onChangeText={setEpisodeTitle}
                placeholder="예: 3화 - 집중하는 법"
                placeholderTextColor="#B6A79D"
                style={styles.input}
              />

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: mounted ? "68%" : "0%" }]} />
              </View>
              <Text style={styles.progressLabel}>이번 달 진행률 68%</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>한 줄 감상평</Text>
            <View style={styles.card}>
              <TextInput
                value={thought}
                onChangeText={setThought}
                placeholder="듣고 난 생각을 자유롭게 적어보세요"
                placeholderTextColor="#B6A79D"
                multiline
                style={[styles.input, styles.textArea]}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>친구에게 남길 말</Text>
            <View style={styles.card}>
              <TextInput
                value={friendNote}
                onChangeText={setFriendNote}
                placeholder="예: 이 부분 너는 어떻게 들었어?"
                placeholderTextColor="#B6A79D"
                multiline
                style={[styles.input, styles.textArea]}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>빠른 반응</Text>
            <View style={styles.reactionWrap}>
              {reactions.map((reaction) => {
                const active = selectedReaction === reaction;
                return (
                  <TouchableOpacity
                    key={reaction}
                    onPress={() => setSelectedReaction(reaction)}
                    style={[styles.reactionPill, active && styles.reactionPillActive]}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.reactionText, active && styles.reactionTextActive]}>
                      {reaction}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>미리보기</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewLabel}>지금 선택한 팟캐스트</Text>
              <Text style={styles.previewTitle}>{podcastTitle || "팟캐스트 제목"}</Text>
              <Text style={styles.previewSub}>{episodeTitle || "에피소드 제목"}</Text>
              <Text style={styles.previewNote}>
                {thought || "한 줄 감상평이 이곳에 보여요."}
              </Text>
              <View style={styles.previewFooter}>
                <Text style={styles.previewChip}>{selectedReaction}</Text>
                <Text style={styles.previewChipSoft}>
                  {friendNote || "친구에게 남길 말"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 18,
  },
  hero: {
    backgroundColor: "#FFF8F3",
    borderRadius: 28,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F4DCC8",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFCC9E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 12,
    color: "#6B3F2D",
  },
  title: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 34,
    color: "#3B2A22",
    lineHeight: 42,
  },
  subtitle: {
    fontFamily: "Baloo2_400Regular",
    fontSize: 18,
    lineHeight: 26,
    color: "#72564A",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 20,
    color: "#3B2A22",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "#F1E2D7",
  },
  label: {
    fontFamily: "Baloo2_700Bold",
    fontSize: 14,
    color: "#6F5A50",
  },
  input: {
    backgroundColor: "#FFF8F3",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F3DDD0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Baloo2_400Regular",
    fontSize: 16,
    color: "#3B2A22",
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  progressBar: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "#F5E8DF",
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FFB97A",
  },
  progressLabel: {
    fontFamily: "Baloo2_700Bold",
    fontSize: 14,
    color: "#A5652D",
  },
  reactionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  reactionPill: {
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F1E2D7",
  },
  reactionPillActive: {
    backgroundColor: "#FFB97A",
    borderColor: "#FFB97A",
  },
  reactionText: {
    fontFamily: "Baloo2_700Bold",
    fontSize: 14,
    color: "#5E4B43",
  },
  reactionTextActive: {
    color: "#FFFFFF",
  },
  previewCard: {
    backgroundColor: "#FFF8F3",
    borderRadius: 24,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#F3DDC9",
  },
  previewLabel: {
    fontFamily: "Baloo2_700Bold",
    fontSize: 13,
    color: "#A06B3B",
  },
  previewTitle: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 22,
    color: "#3B2A22",
  },
  previewSub: {
    fontFamily: "Baloo2_400Regular",
    fontSize: 16,
    color: "#755D51",
  },
  previewNote: {
    fontFamily: "Baloo2_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#5E4B43",
    marginTop: 4,
  },
  previewFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  previewChip: {
    backgroundColor: "#FFB97A",
    color: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: "Baloo2_700Bold",
    fontSize: 13,
    overflow: "hidden",
  },
  previewChipSoft: {
    backgroundColor: "#FFFFFF",
    color: "#6B564B",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: "Baloo2_700Bold",
    fontSize: 13,
    overflow: "hidden",
  },
});
