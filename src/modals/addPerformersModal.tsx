import React, { useState } from "react";
import { Modal, Input, Button, Select, Form, Space, message } from "antd";
import axios from "axios";
import { Performer } from "../types";

const { Option } = Select;

interface AddPerformersModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedPerformers: React.Dispatch<React.SetStateAction<Performer[]>>;
}

const AddPerformersModal: React.FC<AddPerformersModalProps> = ({ isOpen, onClose, setSelectedPerformers }) => {
  const [performers, setPerformers] = useState<Performer[]>([
    { id: "", name: "", instagram: "", isHost: false }
  ]);

  // Function to handle input changes
  const handleInputChange = (index: number, field: keyof Performer, value: string | boolean) => {
    const updatedPerformers = [...performers];
    updatedPerformers[index] = { ...updatedPerformers[index], [field]: value };
    setPerformers(updatedPerformers);
  };

  // Function to add a new performer row
  const handleAddPerformer = () => {
    setPerformers([...performers, { id: "", name: "", instagram: "", isHost: false }]);
  };

  // Function to submit performers
  const handleSubmit = async () => {
    const validPerformers = performers.filter((p) => p.name.trim() !== "");

    if (validPerformers.length === 0) {
      message.error("Please add at least one valid performer before submitting.");
      return;
    }

    try {
      const savedPerformers = await Promise.all(
        validPerformers.map(async (performer) => {
          const response = await axios.post("/api/performers", performer);
          console.log("Response:", response.data);
          return { ...performer, id: response.data.data.id }; 
        })
      );

      console.log("Saved performers:", savedPerformers);
      setSelectedPerformers(savedPerformers);
      message.success("Performers added successfully!");
      setPerformers([{ id: "", name: "", instagram: "", isHost: false }]); // Reset fields
      onClose();
    } catch (error) {
      message.error("Failed to add performers.");
      console.error(error);
    }
  };

  return (
    <Modal title="Add Hosts & Performers" open={isOpen} onCancel={onClose} footer={null}>
      <Form layout="vertical">
        {performers.map((performer, index) => (
          <Space key={index} style={{ display: "flex", marginBottom: 10 }} align="start">
            <Form.Item label="Name" required>
              <Input
                placeholder="Performer Name"
                value={performer.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Instagram">
              <Input
                placeholder="@username (optional)"
                value={performer.instagram}
                onChange={(e) => handleInputChange(index, "instagram", e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Role">
              <Select
                value={performer.isHost ? "Host" : "Performer"}
                onChange={(value) => handleInputChange(index, "isHost", value === "Host")}
              >
                <Option value="Performer">Performer</Option>
                <Option value="Host">Host</Option>
              </Select>
            </Form.Item>
          </Space>
        ))}

        <Button type="dashed" onClick={handleAddPerformer} block>
          + Add Another
        </Button>

        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }} block>
          Save Performers
        </Button>
      </Form>
    </Modal>
  );
};

export default AddPerformersModal;