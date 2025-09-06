import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Images } from "../theme/images";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/MainNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmojiSelector from "react-native-emoji-selector";
// import { ScrollView } from "react-native-gesture-handler";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const categories = [
    "All",
    "Trending",
    "For You",
    "Live",
    "Following",
    "Gaming",
    "Technology",
    "Cryptocurrency",
  ];
  const top_stories = [
    {
      image: Images.story_1,
      title: "Emiley",
    },
    {
      image: Images.story_2,
      title: "Emma",
    },
    {
      image: Images.story_3,
      title: "Olivia",
    },
    {
      image: Images.story_4,
      title: "Michael",
    },
    {
      image: Images.story_1,
      title: "Emiley",
    },
    {
      image: Images.story_2,
      title: "Emma",
    },
    {
      image: Images.story_3,
      title: "Olivia",
    },
    {
      image: Images.story_4,
      title: "Michael",
    },
  ];

  const posts = [
    {
      id: 1,
      time: "30 sec ago",
      user: {
        image: Images.post_user,
        name: "Amelia John",
        following: false,
        isVerified: true,
      },
      post: {
        image: Images.post_image,
        likes: "12.5K",
        comments: "8.5K",
        shares: "5.6K",
        badges: "1.2K HVT",
        title: "Lorm ipsum dolor nbdnf",
        description:
          "Lorem ipsum dolor sit   bn bsjbs jsbdjsbnc bshfvj bhb met ksk consec cbs tetuer #adipiscing #elit .....................more",
      },
    },
    {
      id: 2,
      time: "30 sec ago",
      user: {
        image: Images.post_user,
        name: "Amelia John",
        following: true,
        isVerified: false,
      },
      post: {
        image: Images.post_image,
        likes: "12.5K",
        comments: "8.5K",
        shares: "5.6K",
        badges: "1.2K HVT",
        title: "Lorm ipsum dolor nbdnf",
        description:
          "Lorem ipsum dolor sit   bn bsjbs jsbdjsbnc bshfvj bhb met ksk consec cbs tetuer #adipiscing #elit .....................more",
      },
    },
  ];
  //
  const [selectedCategory, setCategory] = React.useState("All");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#010B1F" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <Image
          source={Images.logo}
          style={{ width: 61, height: 61, marginLeft: -19 }}
        />
        <View style={{ flexDirection: "row", alignContent: "center", gap: 10 }}>
          <Image
            source={Images.search_logo}
            style={{ width: 20, height: 20 }}
          />
          <Image
            source={Images.filter_logo}
            style={{ width: 17, height: 16 }}
          />
          <Image
            source={Images.notification_logo}
            style={{ width: 20, height: 20 }}
          />
        </View>
      </View>

      <FlatList
        data={categories}
        horizontal
        style={{ maxHeight: 20 }}
        contentContainerStyle={{ paddingHorizontal: 13, gap: 10, height: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setCategory(item)}
            key={index}
            style={{
              paddingVertical: 2.5,
              paddingHorizontal: 15,
              height: 15,
              flexGrow: 0,
              backgroundColor:
                item === selectedCategory ? "#125BE4CC" : "white",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: selectedCategory === item ? "white" : "#0F4BBD",
                fontSize: 8,
                lineHeight: 10,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          color: "#F2F2F2",
          fontWeight: "600",
          fontSize: 12,
          marginVertical: 12,
          marginLeft: 13,
          marginTop: 27,
        }}
      >
        Top Stories
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 15,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ width: 55, gap: 8, alignItems: "center" }}>
          <View
            style={{
              height: 55,
              width: 55,
              borderStyle: "dashed",
              borderRadius: 35,
              borderColor: "#FFFFFF",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ position: "absolute", bottom: 0, right: -5, zIndex: 5 }}
            >
              <Image
                source={Images.plus_icon}
                style={{ height: 20, width: 20 }}
              />
            </View>
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 25,
                borderColor: "#FFFFFF",
                borderWidth: 1,
              }}
              source={Images.my_story}
            />
          </View>
          <Text style={{ fontWeight: "700", color: "#F2F2F2", fontSize: 10 }}>
            You
          </Text>
        </View>
        <FlatList
          data={top_stories}
          horizontal
          contentContainerStyle={{ gap: 15 }}
          renderItem={({ item, index }) => (
            <View style={{ width: 55, gap: 8, alignItems: "center" }}>
              <View
                style={{
                  height: 55,
                  width: 55,
                  borderStyle: "dashed",
                  borderRadius: 35,
                  borderColor: "#FFFFFF",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 48,
                    width: 48,
                    borderRadius: 25,
                    borderColor: "#FFFFFF",
                    borderWidth: 1,
                  }}
                  source={item.image}
                />
              </View>
              <Text
                style={{ fontWeight: "700", color: "#F2F2F2", fontSize: 10 }}
              >
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>

      <Text
        style={{
          color: "#F2F2F2",
          fontWeight: "600",
          fontSize: 12,
          marginVertical: 12,
          marginLeft: 13,
          marginTop: 27,
        }}
      >
        My Feeds
      </Text>

      <FlatList
        data={posts}
        // style={{ flexShrink: 1 }}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  flexShrink: 1,
                }}
              >
                <View
                  style={{
                    height: 38,
                    width: 38,
                    borderRadius: 19,
                    borderColor: "#1C60DD",
                    borderWidth: 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.user.image}
                    style={{ height: 33, width: 33, borderRadius: 25 }}
                  />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#F2F2F2",
                        fontSize: 12,
                      }}
                    >
                      {item.user.name}
                    </Text>
                    {item.user.isVerified && (
                      <Image
                        source={Images.verified_icon}
                        style={{ width: 9, height: 9 }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#9BBEFE",
                      fontSize: 8,
                    }}
                  >
                    {item.time}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: item.user.following
                      ? "#0360D2"
                      : "transparent",
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: item.user.following
                      ? "transparent"
                      : "#27303F",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 8, fontWeight: "400" }}
                  >
                    {item.user.following ? "Following" : "Follow"}
                  </Text>
                </View>
              </View>
              <Image
                source={Images.options_icon}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Image
              source={item.post.image}
              style={{ width: "100%" }}
              resizeMode="cover"
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  gap: 5,
                }}
              >
                <Image
                  source={Images.like_icon}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    color: "#9BBEFE",
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  {item.post.likes}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  gap: 5,
                }}
              >
                <Image
                  source={Images.comment_icon}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    color: "#9BBEFE",
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  {item.post.comments}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  gap: 5,
                }}
              >
                <Image
                  source={Images.share_icon}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    color: "#9BBEFE",
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  {item.post.shares}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  gap: 5,
                }}
              >
                <Image
                  source={Images.badge_icon}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    color: "#9BBEFE",
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  {item.post.badges}
                </Text>
              </View>
            </View>

            <View style={{ gap: 10, paddingHorizontal: 20 }}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}
              >
                {item.post.title}
              </Text>
              <Text
                style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "400" }}
              >
                {item.post.description}
              </Text>
            </View>
          </View>
        )}
      />
      <View
        style={
          (StyleSheet.absoluteFill,
          {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            paddingBottom: insets.bottom + 15,
          })
        }
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={Images.home_icon} style={{ height: 24, width: 24 }} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={Images.chat_icon} style={{ height: 24, width: 24 }} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={Images.plus_icon} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={Images.wallet_icon}
            style={{ height: 24, width: 24 }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={Images.my_story}
            style={{ height: 24, width: 24, borderRadius: 12 }}
          />
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#010B1F",
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  cameraButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
