CREATE DATABASE pipeline_runs;
\c pipeline_runs
CREATE TABLE pipelines (
    pipeline_id VARCHAR(100),
    job_run_id VARCHAR(100),
    event VARCHAR(100),
    task_name VARCHAR(100),
    event_result VARCHAR(100),
    error_message VARCHAR(100),
    event_timestamp TIMESTAMP
    )
CREATE USER pipeline_user WITH PASSWORD '***';
GRANT ALL PRIVILEGES ON DATABASE pipeline_runs TO pipeline_user;