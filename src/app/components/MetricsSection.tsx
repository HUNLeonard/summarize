import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart3, Clock, Brain, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";

interface MetricsSectionProps {
  contentValue: {
    informational: number;
    educational: number;
    action_oriented: number;
    strategic: number;
    social_relational: number;
    entertaining: number;
    noise_empty: number;
  };
  timeAndRoi: {
    estimated_reading_time_minutes: number;
    content_density: string;
    expected_usefulness: string;
  };
  novelty: {
    novelty_level: string;
    redundancy_level: string;
  };
  actionCommitment: {
    contains_specific_todo: string;
    contains_question_to_recipient: string;
    contains_deadline_or_urgency: string;
  };
  relevance: {
    directly_addressed_to_recipient: string;
    assumed_relevance: string;
  };
  cognitiveLoad: {
    text_complexity: string;
    mental_load: string;
  };
  assessment: {
    reading_priority: string;
    skippability_estimate_percent: number;
    one_sentence_recommendation: string;
  };
}

export function MetricsSection({
  contentValue,
  timeAndRoi,
  novelty,
  actionCommitment,
  relevance,
  cognitiveLoad,
  assessment,
}: MetricsSectionProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelBadgeVariant = (level: string): "default" | "secondary" | "outline" => {
    switch (level) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-2">
      {/* Content Value Distribution */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <BarChart3 className="h-3 w-3" />
            Content Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          {Object.entries(contentValue).map(([key, value]) => (
            <div key={key} className="space-y-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="capitalize text-xs">{key.replace(/_/g, " ")}</span>
                <span className="font-medium text-xs">{value}%</span>
              </div>
              <Progress value={value} className="h-1" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Novelty & Cognitive Load Combined */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" />
            Novelty & Load
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Novelty</p>
              <Badge variant={getLevelBadgeVariant(novelty.novelty_level)} className="text-xs h-4 px-1">
                {novelty.novelty_level}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Redundancy</p>
              <Badge variant={getLevelBadgeVariant(novelty.redundancy_level)} className="text-xs h-4 px-1">
                {novelty.redundancy_level}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Complexity</p>
              <Badge variant={getLevelBadgeVariant(cognitiveLoad.text_complexity)} className="text-xs h-4 px-1">
                {cognitiveLoad.text_complexity}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Mental Load</p>
              <Badge variant={getLevelBadgeVariant(cognitiveLoad.mental_load)} className="text-xs h-4 px-1">
                {cognitiveLoad.mental_load}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action & Commitment */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 px-3 pb-3">
          <div className="flex items-center justify-between text-xs">
            <span>TODO</span>
            <Badge variant={actionCommitment.contains_specific_todo === "yes" ? "default" : "secondary"} className="text-xs h-4 px-1">
              {actionCommitment.contains_specific_todo}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Question</span>
            <Badge variant={actionCommitment.contains_question_to_recipient === "yes" ? "default" : "secondary"} className="text-xs h-4 px-1">
              {actionCommitment.contains_question_to_recipient}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Deadline</span>
            <Badge variant={actionCommitment.contains_deadline_or_urgency === "yes" ? "default" : "secondary"} className="text-xs h-4 px-1">
              {actionCommitment.contains_deadline_or_urgency}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className="border-primary/30">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs">Priority</span>
            <Badge variant={getLevelBadgeVariant(assessment.reading_priority)} className="text-xs h-4 px-1">
              {assessment.reading_priority}
            </Badge>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-xs">
              <span>Skippability</span>
              <span className="font-medium text-xs">{assessment.skippability_estimate_percent}%</span>
            </div>
            <Progress value={assessment.skippability_estimate_percent} className="h-1" />
          </div>
          <div className="p-2 bg-muted/50 rounded">
            <p className="text-xs leading-relaxed">{assessment.one_sentence_recommendation}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}