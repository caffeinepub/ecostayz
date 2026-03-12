import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  // Types
  type Property = {
    id : Text;
    name : Text;
    location : Text;
    description : Text;
    ecoFeatures : [Text];
    pricePerNight : Nat;
    maxGuests : Nat;
  };

  type Enquiry = {
    name : Text;
    email : Text;
    message : Text;
    propertyId : Text;
  };

  // Compare modules
  module Property {
    public func compare(property1 : Property, property2 : Property) : Order.Order {
      Text.compare(property1.id, property2.id);
    };
  };

  // Storage
  let properties = Map.empty<Text, Property>();
  let enquiries = List.empty<Enquiry>();

  // Seed data
  let seedProperties = [
    {
      id = "prop1";
      name = "Eco Retreat";
      location = "Lake District";
      description = "Solar powered cabin with beautiful views.";
      ecoFeatures = ["Solar Power", "Compost Toilets", "Rainwater Harvesting"];
      pricePerNight = 120;
      maxGuests = 4;
    },
    {
      id = "prop2";
      name = "Sustainable Villa";
      location = "Cornwall";
      description = "Beachfront villa built with recycled materials.";
      ecoFeatures = ["Recycled Materials", "Organic Garden", "Water Saving Fixtures"];
      pricePerNight = 200;
      maxGuests = 6;
    },
  ];

  func initializeSeedData() {
    for (property in seedProperties.values()) {
      properties.add(property.id, property);
    };
  };

  // Methods
  public shared ({ caller }) func addProperty(
    id : Text,
    name : Text,
    location : Text,
    description : Text,
    ecoFeatures : [Text],
    pricePerNight : Nat,
    maxGuests : Nat,
  ) : async () {
    let property : Property = {
      id;
      name;
      location;
      description;
      ecoFeatures;
      pricePerNight;
      maxGuests;
    };

    properties.add(id, property);
  };

  public query ({ caller }) func getProperty(id : Text) : async Property {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) { property };
    };
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray();
  };

  public query ({ caller }) func getSeedProperties() : async [Property] {
    seedProperties;
  };

  public shared ({ caller }) func submitEnquiry(
    name : Text,
    email : Text,
    message : Text,
    propertyId : Text,
  ) : async () {
    let enquiry : Enquiry = {
      name;
      email;
      message;
      propertyId;
    };

    enquiries.add(enquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.toArray();
  };

  // Initialize actor
  public shared ({ caller }) func reset() : async () {
    properties.clear();
    enquiries.clear();
    initializeSeedData();
  };
};
