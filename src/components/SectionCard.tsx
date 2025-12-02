"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit, Loader2 } from "lucide-react";
import type { Section } from "@/types";

interface SectionCardProps {
  section: Section;
  onUpdate: (sectionId: string, content: string, status: string) => Promise<void>;
}

export function SectionCard({ section, onUpdate }: SectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    section.user_edit || section.improved
  );
  const [isSaving, setIsSaving] = useState(false);

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      summary: "Professional Summary",
      skills: "Skills",
      experience: "Work Experience",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
      interests: "Interests",
    };
    const title = titles[section.type] || section.type;
    // Add number for multiple experiences
    if (section.type === "experience" && section.index > 0) {
      return `${title} ${section.index + 1}`;
    }
    return title;
  };

  const getStatusBadge = () => {
    const variants: Record<string, { variant: any; label: string; className?: string }> = {
      pending: { variant: "secondary", label: "Pending Review" },
      approved: { variant: "default", label: "Approved", className: "bg-green-600 hover:bg-green-700" },
      edited: { variant: "outline", label: "Edited", className: "border-blue-600 text-blue-600" },
    };
    const config = variants[section.status] || variants.pending;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleApprove = async () => {
    setIsSaving(true);
    try {
      await onUpdate(section.id, section.improved, "approved");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(section.id, editedContent, "edited");
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(section.user_edit || section.improved);
    setIsEditing(false);
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{getSectionTitle()}</h3>
        {getStatusBadge()}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Original */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-sm text-gray-500 mb-2 font-medium">Original</div>
          <div className="prose prose-sm whitespace-pre-wrap text-gray-700">
            {section.original || "N/A"}
          </div>
        </div>

        {/* Improved / Edit */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-sm text-blue-600 mb-2 font-medium">AI Improved</div>
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[200px] bg-white"
              disabled={isSaving}
            />
          ) : (
            <div className="prose prose-sm whitespace-pre-wrap text-gray-700">
              {section.user_edit || section.improved}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!isEditing ? (
          <>
            <Button
              onClick={handleApprove}
              disabled={section.status === "approved" || isSaving}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Approve
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="gap-2"
              disabled={isSaving}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isSaving}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
