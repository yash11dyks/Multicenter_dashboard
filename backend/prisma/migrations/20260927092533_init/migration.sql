-- CreateTable
CREATE TABLE "site_master" (
    "site_id" TEXT NOT NULL,
    "site_name" TEXT NOT NULL,
    "pi_name" TEXT NOT NULL,
    "irb_approval_no" TEXT NOT NULL,

    CONSTRAINT "site_master_pkey" PRIMARY KEY ("site_id")
);

-- CreateTable
CREATE TABLE "participants" (
    "study_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consent_status" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("study_id")
);

-- CreateTable
CREATE TABLE "clinical_visits" (
    "visit_id" TEXT NOT NULL,
    "study_id" TEXT NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "form_type" TEXT NOT NULL,
    "redcap_record_id" TEXT,

    CONSTRAINT "clinical_visits_pkey" PRIMARY KEY ("visit_id")
);

-- CreateTable
CREATE TABLE "imaging_studies" (
    "image_id" TEXT NOT NULL,
    "study_id" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "pacs_accession_no" TEXT NOT NULL,

    CONSTRAINT "imaging_studies_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("event_id")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site_master"("site_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinical_visits" ADD CONSTRAINT "clinical_visits_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "participants"("study_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imaging_studies" ADD CONSTRAINT "imaging_studies_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "participants"("study_id") ON DELETE RESTRICT ON UPDATE CASCADE;
