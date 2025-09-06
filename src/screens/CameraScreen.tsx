import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/MainNavigator";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraDevices,
} from "react-native-vision-camera";
import { Images } from "../theme/images";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import EmojiSelector from "react-native-emoji-selector";
import EmojiPicker from "rn-emoji-keyboard";
import { ReactNativeModal } from "react-native-modal";

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Camera">;
};

const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const { hasPermission } = useCameraPermission();
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const device = useCameraDevice(isFrontCamera ? "front" : "back");
  const cameraRef = React.useRef<Camera>(null);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const devices = Camera.getAvailableCameraDevices();
  // const device = getCameraD(devices, 'back')
  const devices1 = useCameraDevices();
  // const device = devices.back
  console.log("devices", devices, devices1);

  const [isFlashOn, setFlash] = useState(false);

  if (device == null)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (!hasPermission)
    return (
      <View>
        <Text>No camera permission</Text>
      </View>
    );

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto({
      flash: isFlashOn && !isFrontCamera ? "on" : "off",
    });
    console.log("photo", photo);
    if (photo?.path) {
      setPhotos((prev) => [...prev, photo.path]);
    }
  };
  const reverseCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      setIsSheetOpen(false);
    } else {
      setIsSheetOpen(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle={"light-content"} />
      <Camera
        ref={cameraRef}
        device={device}
        isActive
        style={StyleSheet.absoluteFill}
        photo={true}
      />
      <TouchableOpacity
        style={
          (StyleSheet.absoluteFill, { position: "absolute", top: 60, left: 20 })
        }
        onPress={() => navigation.goBack()}
      >
        {/* <Text style={{ color: 'white', fontSize: 18 }}>Cancel</Text> */}
        <Image source={Images.cancle_logo} style={{ height: 24, width: 24 }} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
          zIndex: isSheetOpen ? 0 : 99,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {photos.length > 0 ? (
            <TouchableOpacity>
              <Image
                source={{ uri: "file://" + photos[photos.length - 1] }}
                style={{ width: 25, height: 25, borderRadius: 4 }}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "transparent",
              }}
            />
          )}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              setFlash(!isFlashOn);
            }}
          >
            <Image
              source={Images.flash_logo}
              style={{ height: 28.5, width: 28.5 }}
              tintColor={isFlashOn ? "yellow" : "white"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#FFFFFF4D",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
            onPress={takePhoto}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                backgroundColor: "white",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={reverseCamera}>
            <Image
              source={Images.change_camera_logo}
              style={{ height: 23.29, width: 23.74 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(true);
              // bottomSheetRef.current?.expand()
            }}
          >
            <Image
              source={Images.emoji_selector_logo}
              style={{ height: 23.29, width: 23.74 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <EmojiPicker
        onEmojiSelected={(emoji) => {
          console.log("Selected Emoji:", emoji.emoji);
          setIsModalOpen(false);
          // TODO: Add this emoji as draggable sticker on camera preview
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={{
          backdrop: "rgba(0,0,0,0.3)", // modal backdrop
          knob: "#FFFFFF", // small top bar
          container: "#0A0A0A", // background of emoji selector
          header: "#1C1C1E", // header/search background
          search: "#2C2C2E", // search bar input bg
          category: {
            icon: "#FFFFFF", // icon default color
            iconActive: "#FFD700", // active tab color
            container: "#0A0A0A", // category bar bg
          },
          skinTonesContainer: "#1C1C1E", // background of skin tone selector
        }}
      />
      {/* <ReactNativeModal
        isVisible={isModalOpen}
        onBackdropPress={() => setIsModalOpen(false)}
        onBackButtonPress={() => setIsModalOpen(false)}
        style={(StyleSheet.absoluteFill, { justifyContent: "flex-end" })}
      >
        <View style={styles.contentContainer}>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            Emoji Selector
          </Text>
        </View>
      </ReactNativeModal> */}
      {/* <View style={StyleSheet.absoluteFill, { position: 'absolute', bottom: 0, width: '100%', height: '50%' }}>
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    index={-1}

                    backdropComponent={() => <TouchableOpacity onPress={() => bottomSheetRef.current?.close()} style={{ flex: 1, backgroundColor: 'transparent', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Emoji Selector</Text>
                        <EmojiSelector showTabs onEmojiSelected={(emoji) => console.log(emoji)} />
                    </BottomSheetView>
                </BottomSheet>
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: '#01081AE5',
    backfaceVisibility: "hidden",
    padding: 36,
    alignItems: "center",
    zIndex: 100,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CameraScreen;
