import React from "react";
import { Typography, List } from "antd";

const { Title, Text } = Typography;

const Menu: React.FC = () => {
  const menuSections = [
    {
      title: "Cocktails",
      items: [
        { name: "Re-Hanamarator", description: "Hana Makgeolli 'Takju', Hayman’s Gin, Triple Sec, Mata Hari Absinthe, Herb Oil", price: "$15" },
        { name: "Harvest Moon", description: "Madre Mezcal or Javelina Tequila, Housemade Chili Vinegar, Triple Sec, Lime", price: "$16" },
        { name: "Cà Phê-tini", description: "Honey’s Vodka, Forthave ‘Brown’, Young Coffee Cold Brew, Longevity Brand Condensed Milk", price: "$17" },
        { name: "Blue Flowers", description: "Empress Blue Gin, Amaro Montenegro, Lavender Bitters", price: "$15" },
        { name: "Mezcal Negroni", description: "Madre Mezcal, Forthave ‘Red’, Primitivo Quiles Vermouth", price: "$16" },
        { name: "Ocean Martini", description: "Honey’s Vodka, Montauk Ocean Water, foraged and preserved Autumn Olives", price: "$16" },
        { name: "El Topo", description: "Choice of spirit, Topo Chico Mineral Water, Fresh Citrus", price: "$12 (+$2 for Madre Mezcal)" },
        { name: "Scott Toddy", description: "Choice of Whiskey or Rum, Lemon, Honey Simple", price: "$13 (+$2 for Madre Mezcal)" },
      ],
    },
    {
      title: "Mead Cocktails",
      items: [
        { name: "Charm 75", description: "‘Charm’ Sparkling Mead, Hennessy VS Cognac, St-Germain Elderflower Liqueur, Lemon", price: "$17" },
        { name: "Sea Legs", description: "‘Dagger’ Botanical Cherry Mead, Neversink Gin, Honey Simple, Lemon", price: "$16" },
        { name: "Lion’s Tooth", description: "‘Memento Mori’ Dandelion Mead, Hayman’s Gin, Cocchi Americano, Salers Aperitif", price: "$16" },
        { name: "Death in the Night", description: "‘Night Eyes’ Sparkling Mead, Mata Hari Absinthe, Honey Simple", price: "$15" },
        { name: "St. Crimson Spritz", description: "‘St. Crimson’ Black Currant Mead, Forthave Red Aperitivo, Azimut Cava Brut Nature", price: "$15" },
      ],
    },
    {
      title: "Zero Proof",
      items: [
        { name: "Yellow Jacket", description: "Housemade ginger-turmeric honey syrup, lemon, Topo Chico", price: "$8" },
        { name: "Rooftop Shrub", description: "Housemade black currant shrub, herbs from our garden, honey simple, lime, Topo Chico", price: "$8" },
        { name: "Topo Chico", description: "The ultimate mineral water", price: "$4" },
        { name: "Yesfolk", description: "Oolong kombucha made in Troy, NY", price: "$7" },
        { name: "White Label", description: "Sparkling Yerba Mate Soda", price: "$6" },
      ],
    },
    {
      title: "Snacks & Merchandise",
      items: [
        { name: "Wagyu Hand Pie", description: "Snake River Farms wagyu ground beef nested in puff pastry", price: "1 for $7, 2 for $13" },
        { name: "Have-a-Chips", description: "Corn chips with soy sauce. Vegan. Cult favorite.", price: "$4 (bowl), $8 (bag)" },
        { name: "Honey’s Mug", description: "Cute mug", price: "$12" },
        { name: "Mead Bottles to Go", description: "Take home a bottle of Enlightenment Wines!", price: "$25–30" },
      ],
    },
  ];

  return (
    <div style={{ marginTop: '30px', marginBottom: '30px', padding: "15x", maxWidth: '800px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      {menuSections.map((section, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <Title level={2}>{section.title}</Title>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={section.items}
            renderItem={(item) => (
              <List.Item>
                  <Text strong>{item.name}</Text><br/>
                  <Text>{item.description}</Text>
                  <br />
                  <Text strong>{item.price}</Text>
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Menu;