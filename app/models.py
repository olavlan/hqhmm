from pydantic import BaseModel, Field, model_validator, field_validator
from typing import Optional

MEGABYTE = 1048576
BYTES_PER_TRIANGLE = 50


class MeshSettings(BaseModel):
    image_width: Optional[float] = Field(None, ge=0)
    image_height: Optional[float] = Field(None, ge=0)
    invert: bool = False
    full_greyscale: bool = False
    width: Optional[float] = Field(None, ge=0)
    depth: Optional[float] = Field(None, ge=0)
    rel_depth: Optional[float] = Field(0.05, ge=0)
    max_file_size_mb: Optional[float] = Field(20, ge=0)
    rel_base_height: Optional[float] = Field(0.05, ge=0)

    @field_validator("rel_depth", "rel_base_height", mode="before")
    def convert_percentage(cls, v):
        if isinstance(v, str) and v.endswith("%"):
            return float(v.strip("%")) / 100
        return v

    @model_validator(mode="after")
    def check_absolute_values(self):
        if self.width is not None and self.depth is not None:
            self.rel_depth = self.depth / self.width
        return self

    def get_max_file_size_bytes(self):
        return self.max_file_size_mb * MEGABYTE

    def get_max_num_triangles(self):
        m = self.get_max_file_size_bytes() / BYTES_PER_TRIANGLE
        m = int(m)
        return m

    def get_max_num_vertices_estimate(self):
        m = 0.5 * self.get_max_num_triangles()
        m = int(m)
        return m

    def get_pixel_depth(self):
        return self.image_width * self.rel_depth

    def get_base_height_rel_to_depth(self):
        pixel_base_height = self.image_width * self.rel_base_height
        return pixel_base_height / self.get_pixel_depth()

    def hmm_z(self):
        return str(self.get_pixel_depth())

    def hmm_t(self):
        return str(self.get_max_num_triangles())

    def hmm_p(self):
        return str(self.get_max_num_vertices_estimate())

    def hmm_b(self):
        return str(self.get_base_height_rel_to_depth())

    def hmm_extra_options(self):
        options = []
        if self.invert:
            options.append("--invert")
        if self.full_greyscale:
            options.append("--level")
        return options


class InputField:
    def __init__(self, name, label, unit, placeholder=""):
        self.name = name
        self.label = label
        self.unit = unit
        self.is_valid = True
        self.msg = ""
        self.placeholder = placeholder


class MeshForm:
    def __init__(self):
        placeholder_relative_value = "e.g. 0.1, 5%"
        self.width = InputField("width", "abs. width", "units")
        self.depth = InputField("depth", "abs. depth", "units")
        self.rel_depth = InputField(
            "rel_depth",
            "rel. depth",
            "relative to width",
            placeholder=placeholder_relative_value,
        )
        self.rel_base_height = InputField(
            "rel_base_height",
            "rel. base height",
            "relative to width",
            placeholder=placeholder_relative_value,
        )
        self.max_file_size_mb = InputField("max_file_size_mb", "max. file size", "MB")
