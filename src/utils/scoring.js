import { inspectionChecklist, recommendationCopy } from "../content/copy";

const inspectionWeights = {
  serviceHistory: 16,
  tires: 8,
  paintConsistency: 8,
  engineNoise: 16,
  suspension: 10,
  electronics: 10,
  acPerformance: 8,
  testDrive: 12,
  accidentSignals: 12,
};

const conditionPenalty = {
  excellent: 0,
  good: 6,
  fair: 14,
  risky: 24,
};

export function calculateTrustScore(car) {
  const checklistScore = Object.entries(inspectionWeights).reduce((score, [key, weight]) => {
    return score + (car.checklist?.[key] ? weight : 0);
  }, 0);

  const agePenalty = Math.min(18, Math.max(0, Number(car.age || 0) * 1.5));
  const mileagePenalty = Math.min(20, Math.max(0, Number(car.mileage || 0) / 12000));
  const ownerPenalty = Math.max(0, Number(car.previousOwners || 0) - 1) * 4;
  const conditionScore = 100 - (conditionPenalty[car.condition] ?? 12);
  const baseScore = 42 + checklistScore * 0.52 + conditionScore * 0.26;

  return Math.max(18, Math.min(96, Math.round(baseScore - agePenalty - mileagePenalty - ownerPenalty)));
}

export function estimateMaintenance(car) {
  const age = Number(car.age || 0);
  const mileage = Number(car.mileage || 0);
  const base = 26000;
  const ageLoad = age * 4200;
  const mileageLoad = mileage * 0.18;
  const conditionLoad =
    {
      excellent: 4000,
      good: 8500,
      fair: 16000,
      risky: 28000,
    }[car.condition] ?? 12000;

  return Math.round(base + ageLoad + mileageLoad + conditionLoad);
}

export function getRecommendation(score) {
  if (score >= 78) {
    return recommendationCopy.strongBuy;
  }

  if (score >= 60) {
    return recommendationCopy.negotiate;
  }

  return recommendationCopy.walkAway;
}

export function getVerificationCoverage(checklist = {}) {
  const totalChecks = Object.keys(inspectionWeights).length;
  const verifiedChecks = Object.keys(inspectionWeights).filter((key) => Boolean(checklist[key])).length;
  const verificationCoverage = Math.round((verifiedChecks / totalChecks) * 100);

  return {
    totalChecks,
    verifiedChecks,
    verificationCoverage,
  };
}

export function getRiskFlags(car) {
  const flags = [];

  if (!car.checklist?.serviceHistory) {
    flags.push("Service history has not been verified yet.");
  }

  if (Number(car.previousOwners || 0) > 2) {
    flags.push("This car has had more than two previous owners.");
  }

  if (Number(car.mileage || 0) >= 80000) {
    flags.push("Mileage is high enough to raise future maintenance risk.");
  }

  if (["fair", "risky"].includes(car.condition)) {
    flags.push("The reported condition suggests above-average repair risk.");
  }

  if (!car.checklist?.accidentSignals) {
    flags.push("Accident-free status is still not verified.");
  }

  if (!car.checklist?.testDrive) {
    flags.push("A full test-drive result is still missing.");
  }

  return flags.slice(0, 4);
}

export function getMissingChecks(checklist = {}) {
  return inspectionChecklist
    .filter(({ key }) => !checklist[key])
    .map(({ label }) => label);
}

export function createCarInsights(car) {
  const trustScore = calculateTrustScore(car);
  const estimatedMaintenance = estimateMaintenance(car);
  const recommendation = getRecommendation(trustScore);
  const price = Number(car.askingPrice || 0);
  const fairValue = Math.round(price - Math.max(0, 76 - trustScore) * 1800);
  const { totalChecks, verifiedChecks, verificationCoverage } = getVerificationCoverage(car.checklist);
  const riskFlags = getRiskFlags(car);
  const missingChecks = getMissingChecks(car.checklist);

  return {
    trustScore,
    estimatedMaintenance,
    recommendation,
    fairValue,
    totalChecks,
    verifiedChecks,
    verificationCoverage,
    riskFlags,
    missingChecks,
  };
}
