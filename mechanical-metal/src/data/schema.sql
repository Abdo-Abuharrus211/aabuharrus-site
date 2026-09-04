-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  teaser TEXT,
  text TEXT,
  featured INTEGER DEFAULT 0,
  date TEXT,
  status TEXT CHECK(status IN ('Planning', 'Upcoming', 'In Progress', 'Completed', 'Paused')),
  link TEXT,
  github TEXT
);

-- Project tags (normalized many-to-many)
CREATE TABLE IF NOT EXISTS project_tags (
  project_id INTEGER,
  tag TEXT,
  PRIMARY KEY (project_id, tag),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);

-- Project keypoints (ordered list)
CREATE TABLE IF NOT EXISTS project_keypoints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER,
  sort_order INTEGER,
  keypoint TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_project_keypoints_project_id ON project_keypoints(project_id);

-- Project images (ordered list)
CREATE TABLE IF NOT EXISTS project_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER,
  image_url TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT
);

-- Skill points (ordered list)
CREATE TABLE IF NOT EXISTS skill_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_id INTEGER,
  sort_order INTEGER,
  point TEXT,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_skill_points_skill_id ON skill_points(skill_id);
