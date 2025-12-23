import { useState } from "react";
import {
    Image,
    SectionList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Market({ navigation }: any) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  

  // ✅ REAL PRODUCT IMAGES
  const DATA = [
    {
      title: "Phones and Tablets",
      image:
        "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
      data: [
        {
          name: "Itel City 100",
          price: 120,
          image: "https://fdn2.gsmarena.com/vv/bigpic/itel-a70.jpg",
        },
        {
          name: "Xiaomi Redmi 15c",
          price: 150,
          image:
            "data:image/jpeg;base64,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",
        },
        {
          name: "iPhone 17",
          price: 1500,
          image:
            "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
        },
      ],
    },
  
    {
      title: "Men and Women Fashion",
      image:
        "https://m.media-amazon.com/images/I/81WI-Ap-O8L._AC_UL320_.jpg",
      data: [
        {
          name: "MAGCOMSEN Men's Heavy Hoodie Sherpa Fleece Lined Pullover Thick Winter Hooded Sweatshirt",
          price: 50,
          image: "https://m.media-amazon.com/images/I/81vNw1nFY3L._AC_UL320_.jpg",
        },
        {
          name: "Hoodies for Women",
          price: 103,
          image:
            "data:data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAESQAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAApgAAAKYAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAIAAgAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAEUW1kYXQSAAoKGB3paVggQEDQgDK4CBIAAooooUDcanAnVT5qH6IKjG12PW/SRWAMBXR7kfysCJql4DFG2haV5TEJbu82H3co6RdA7r/p+dLA/cbPBrmquP9Vv6X+oY7YGd4qLZ2BPDeeJfSez/sC8tFFmO2i0SZP0BMv+km8fMN7ijlAcGzTOXZZrhRj86W8yLFmIdu9B62/TwqGts+rFehDkdnbE5pLKjlXknTE4/K9+s9K40GpMDy38Weze6o4UcWiN2h6HNREsvGJuBYAhcuT17vMmfOWi8fOmRRHiMB90g//a6m34kaUqRKn1U/o0IWCFjEaDwbx8PonlZy+uMCdRQIN5d3Eo2OKRUJhifwkWbT5lYGUptFidAE5GW/HI4vkZDCJc84ltdPrn6OnacE7XiCXXsMq2jKbJyYQ2YwWr0Pm2m8xejupJzo3RmVIvlzOy4N18IN/5LXzcbeZbktw8v4xlST+ViPg/+mTdUcqRUNelLGb8/cO260IU5VU75v6vzBRslLgT8fvaKhNnG8mJ5Wnddnlwb7kuyVDb7M1aYcy19ANUcIHOsNKgbF5zeyBkGH/Cnv2ZeVjdxZDziAX0Wkil7hVMNylZHQUFj9GG3EzHwHstKR0RU3SpuCj+3MWOc5CjlJ5g+CHCUdTLBd0PEWdHBIXonol9UjlvenpNeH+l8p8HLAW0AedCFG0pvaPjlee8YcQs5ANMsuLsP7NEqj8ZcdLjbT90/UN9dm/mpj5JCXnw7pVe6X+9+vPDpXpbF8qZyHQcfgZBBq3uD0WgFwVVpmPoQwbBls5i8g5lzkoYwU+WS1BdvmJ+0ywgKMj9SCALyg9olXal/lSpsHmUf5shOxslOOJzyqoXd2APsdHue6IFbMPTicnmfvkPcCFHl3Kti7dPq7eISCpgenIe7IJCgCd4tZWrkDiEFjWrE9PVjrtzalaZF8BRq0wj9cBTFKoxF2PBpi/zbHE4vKanbJe93XG9qZPy4UDDYokoBaA674EansDyguLdLkCdGtfvcfz+GuNY2qSVjic989Nf1OZXYGuoPrq30Kxdc6VB3IczbPTQkW3u5rSScNM23o2OXG+22NiK7rcm1xsBIqWamc7QszqPpLhndtz7aSFL5B7J7Y5wDl4zqEmJmoG/BL1S5G8B7DqSqLAdwNI5wDVqhbeJmD1/yz/b5HTlv4g7VmfTHAsQmDDaxYRxt9IMXLWQiZ4mVNYEQmcMkDKOYEkDXAJ0znKW5ItW8AAXtKsTP21SfQP+RrBXgNB2gYIWcvwqBD9KWGwll2cdIVLxlP5cTjAdBlVZJdz/zGvEueyQ4W4somV2fTazw/jlYmjEPAM/AfuaqqEFvI/j0XRWyQ5Q2dqMrzPrMx42uTDghnOwyS74eVbb1ScnCiofeZch04nZ6T/CkQ5U/G7BVT61mvdMNC/QAPqXzhOSWvIba0CBJAxxys0ozcg4CK00A==",
        },
        {
          name: "Sun Glasses",
          price: 35,
          image:
            "https://m.media-amazon.com/images/I/51PDHChY8aL._AC_SX522_.jpg",
        },
      ],
    },






    {
      title: "Main dishes",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8Kb47m59pB1v8gE31zVP2IPqJJtgZHeacQ&s",
      data: [
        {
          name: "Pizza",
          price: 15,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzyEZwJfZj0U4Vi4_lneSWpyXIu78iI0TojniIXo1s8ierbtASsZqbrmubOHcTPCbu7m5Tg&s",
        },
        {
          name: "Burger",
          price: 10,
          image: "data:image/jpeg;base64,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",
        },
        {
          name: "Risotto",
          price: 12,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTod_oZYAe8xfmCRubmHHAse3kby87VM-eLsrfO4Ty-kQiMyk4oxgnVaGaZ7ihmJAGshKl1Fg&s",
        },
      ],
    },
  ];

  // ✅ SEARCH FILTER
  const filteredData = DATA.map((section) => ({
    ...section,
    data: section.data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const renderItem = ({ item }: any) => (
    <View
      style={{
        padding: 10,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 15,
        margin: 10,
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 70, height: 70, borderRadius: 10 }}
      />

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontWeight: "bold" }}>Price: ${item.price}</Text>

        <TouchableOpacity
          onPress={() => addToCart(item)}
          style={{
            marginTop: 10,
            backgroundColor: "purple",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      {/* ✅ SEARCH BAR */}
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={{
          margin: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
        }}
      />

      {/* ✅ CART BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart", { cart })}
        style={{
          backgroundColor: "purple",
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Go to Cart ({cart.length})
        </Text>
      </TouchableOpacity>

      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {section.title}
            </Text>

            <Image
              source={{ uri: section.image }}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 10,
                marginTop: 5,
              }}
            />
          </View>
        )}
      />
    </SafeAreaProvider>
  );
}


