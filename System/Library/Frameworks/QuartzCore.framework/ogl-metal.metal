#include <metal_stdlib>
using namespace metal;

#pragma mark downsample_4

struct VertexDownInput {
  float4 position;
  float2 texcoord0;
};

struct VertexDown4Output {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
};

vertex VertexDown4Output
downsample_4_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                  constant float4x4 *mvp_matrix [[ buffer(1) ]],
                  constant float4 *texmat [[ buffer(2) ]],
                  constant float2 *offset [[ buffer(3) ]],
                  uint v_id [[ vertex_id ]])
{
  VertexDown4Output v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat[0].xy + texmat[0].zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  float4 texmat0 = texmat[0];
  v_out.texcoord0 = t0 + offset[0] * texmat0.xy;
  v_out.texcoord1 = t0 + offset[1] * texmat0.xy;
  v_out.texcoord2 = t0 + offset[2] * texmat0.xy;
  v_out.texcoord3 = t0 + offset[3] * texmat0.xy;
  return v_out;
};

fragment half4
downsample_4_frag(VertexDown4Output v_in [[ stage_in ]],
                  texture2d<half> texture0 [[ texture(0) ]],
                  sampler sampler0 [[ sampler(0) ]],
                  constant float *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  acc  = q0 * weight[0];
  acc += q1 * weight[1];
  acc += q2 * weight[2];
  acc += q3 * weight[3];
  return acc;
}

#pragma mark - downsample_6

struct VertexDown6Output {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
  float2 texcoord4;
  float2 texcoord5;
};

vertex VertexDown6Output
downsample_6_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                  constant float4x4 *mvp_matrix [[ buffer(1) ]],
                  constant float4 &texmat0 [[ buffer(2) ]],
                  constant float2 *offset [[ buffer(3) ]],
                  uint v_id [[ vertex_id ]])
{
  VertexDown6Output v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = t0 - offset[2] * texmat0.xy;
  v_out.texcoord1 = t0 - offset[1] * texmat0.xy;
  v_out.texcoord2 = t0 - offset[0] * texmat0.xy;
  v_out.texcoord3 = t0 + offset[0] * texmat0.xy;
  v_out.texcoord4 = t0 + offset[1] * texmat0.xy;
  v_out.texcoord5 = t0 + offset[2] * texmat0.xy;
  return v_out;
};

fragment half4
downsample_6_frag(VertexDown6Output v_in [[ stage_in ]],
                  texture2d<half> texture0 [[ texture(0) ]],
                  sampler sampler0 [[ sampler(0) ]],
                  constant float *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  acc  = (q2 + q3) * weight[0];
  acc += (q1 + q4) * weight[1];
  acc += (q0 + q5) * weight[2];
  return acc;
}

#pragma mark - upsample

struct VertexUpsampleOutput {
  float4 position [[ position ]];
  float2 texcoord0;
};

vertex VertexUpsampleOutput
upsample_vert(const device VertexDownInput *vi [[ buffer(0) ]],
              constant float4x4 *mvp_matrix [[ buffer(1) ]],
              constant float2 &axis [[ buffer(2) ]],
              uint v_id [[ vertex_id ]])
{
  VertexUpsampleOutput v_out;
  VertexDownInput v_in = vi[v_id];
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = v_in.texcoord0 - 0.5f * axis;
  return v_out;
};

struct UpsampleUniforms {
  float2 axis;
  float4 texmat0;
};

fragment half4
upsample_frag(VertexUpsampleOutput v_in [[ stage_in ]],
              texture2d<half> texture0 [[ texture(0) ]],
              sampler sampler0 [[ sampler(0) ]],
              constant UpsampleUniforms &u [[ buffer(0) ]])
{
  float2 d = v_in.texcoord0;
  /* horiz: [floor(d.x), d.y]; vert: [d.x, floor(d.y)]. */
  float2 c = mix(d, floor(d), u.axis);
  float x = dot(floor(d) - d, u.axis) + 1.0f;
  float y = 1.0f - x;
  /* polynomial approximation to Lanczos2 kernel weights, from CI. */
  float4 xy = float4(x, y, x, y);
  float4 w = float4(-0.29216512f, -0.41086841f, -0.41086841f, -0.29216512f);
  w = w*xy + float4( 1.02524562f,  0.78286595f,  0.78286595f,  1.02524562f);
  w = w*xy + float4(-0.52422910f,  1.04059357f,  1.04059357f, -0.52422910f);
  w = w*xy + float4(-0.20885140f, -2.41189213f, -2.41189213f, -0.20885140f);
  w = w*xy*xy + float4(0.0f, 1.0f, 1.0f, 0.0f);
  half4 weight = static_cast<half4>(w);
  /* calculate texture coordinates. */
  float2 p = c * u.texmat0.xy + u.texmat0.zw;
  float2 pdelta = u.axis * u.texmat0.xy;
  /* evaluate kernel. */
  half4 q0, q1, q2, q3;
  half4 acc;
  q0 = texture0.sample(sampler0, p - 0.5f*pdelta);
  q1 = texture0.sample(sampler0, p + 0.5f*pdelta);
  q2 = texture0.sample(sampler0, p + 1.5f*pdelta);
  q3 = texture0.sample(sampler0, p + 2.5f*pdelta);
  acc = q0 * weight.x;
  acc = q1 * weight.y + acc;
  acc = q2 * weight.z + acc;
  acc = q3 * weight.w + acc;
  return acc;
}

#pragma mark - downsample_blur_2

struct VertexDownBlur2Output {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
  float2 texcoord4;
  float2 texcoord5;
  float2 texcoord6;
};

vertex VertexDownBlur2Output
downsample_blur_2_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                       constant float4x4 *mvp_matrix [[ buffer(1) ]],
                       constant float4 &texmat0 [[ buffer(2) ]],
                       constant float2 *offset [[ buffer(3) ]],
                       uint v_id [[ vertex_id ]])
{
  VertexDownBlur2Output v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = t0 - offset[2] * texmat0.xy;
  v_out.texcoord1 = t0 - offset[1] * texmat0.xy;
  v_out.texcoord2 = t0 - offset[0] * texmat0.xy;
  v_out.texcoord3 = t0;
  v_out.texcoord4 = t0 + offset[0] * texmat0.xy;
  v_out.texcoord5 = t0 + offset[1] * texmat0.xy;
  v_out.texcoord6 = t0 + offset[2] * texmat0.xy;
  return v_out;
};

fragment half4
downsample_blur_2_frag(VertexDownBlur2Output v_in [[ stage_in ]],
                       texture2d<half> texture0 [[ texture(0) ]],
                       sampler sampler0 [[ sampler(0) ]],
                       constant half4 &weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  acc = q3 * weight.x;
  acc = q2 * weight.y + acc;
  acc = q4 * weight.y + acc;
  acc = q1 * weight.z + acc;
  acc = q5 * weight.z + acc;
  acc = q0 * weight.w + acc;
  acc = q6 * weight.w + acc;
  return acc;
}

#pragma mark - downsample_blur_4

struct VertexDownBlur4Output {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
  float2 texcoord4;
  float2 texcoord5;
  float2 texcoord6;
  float2 texcoord7;
  float2 texcoord8;
  float2 texcoord9;
  float2 texcoord10;
  float2 texcoord11;
  float2 texcoord12;
};

vertex VertexDownBlur4Output
downsample_blur_4_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                       constant float4x4 *mvp_matrix [[ buffer(1) ]],
                       constant float4 &texmat0 [[ buffer(2) ]],
                       constant float2 *offset [[ buffer(3) ]],
                       uint v_id [[ vertex_id ]])
{
  VertexDownBlur4Output v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = t0 - offset[5] * texmat0.xy;
  v_out.texcoord1 = t0 - offset[4] * texmat0.xy;
  v_out.texcoord2 = t0 - offset[3] * texmat0.xy;
  v_out.texcoord3 = t0 - offset[2] * texmat0.xy;
  v_out.texcoord4 = t0 - offset[1] * texmat0.xy;
  v_out.texcoord5 = t0 - offset[0] * texmat0.xy;
  v_out.texcoord6 = t0;
  v_out.texcoord7 = t0 + offset[0] * texmat0.xy;
  v_out.texcoord8 = t0 + offset[1] * texmat0.xy;
  v_out.texcoord9 = t0 + offset[2] * texmat0.xy;
  v_out.texcoord10 = t0 + offset[3] * texmat0.xy;
  v_out.texcoord11 = t0 + offset[4] * texmat0.xy;
  v_out.texcoord12 = t0 + offset[5] * texmat0.xy;
  return v_out;
};

fragment half4
downsample_blur_4_frag(VertexDownBlur4Output v_in [[ stage_in ]],
                       texture2d<half> texture0 [[ texture(0) ]],
                       sampler sampler0 [[ sampler(0) ]],
                       constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  half4 q10 = texture0.sample(sampler0, v_in.texcoord10);
  half4 q11 = texture0.sample(sampler0, v_in.texcoord11);
  half4 q12 = texture0.sample(sampler0, v_in.texcoord12);
  acc = q6 * weight[0].x;
  acc = q5 * weight[0].y + acc;
  acc = q7 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q8 * weight[0].z + acc;
  acc = q3 * weight[0].w + acc;
  acc = q9 * weight[0].w + acc;
  acc = q2 * weight[1].x + acc;
  acc = q10 * weight[1].x + acc;
  acc = q1 * weight[1].y + acc;
  acc = q11 * weight[1].y + acc;
  acc = q0 * weight[1].z + acc;
  acc = q12 * weight[1].z + acc;
  return acc;
}

#pragma mark - downsample_blur_4x4

struct VertexDownBlur4x4Output {
  float4 position [[ position ]];
  float2 texcoord0;
};

vertex VertexDownBlur4x4Output
downsample_blur_4x4_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                         constant float4x4 *mvp_matrix [[ buffer(1) ]],
                         constant float4 &texmat0 [[ buffer(2) ]],
                         uint v_id [[ vertex_id ]])
{
  VertexDownBlur4x4Output v_out;
  VertexDownInput v_in = vi[v_id];
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  return v_out;
};

fragment half4
downsample_blur_4x4_frag(VertexDownBlur4x4Output v_in [[ stage_in ]],
                       texture2d<half> texture0 [[ texture(0) ]],
                       sampler sampler0 [[ sampler(0) ]],
                       constant float2 *offset [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0 + offset[0]);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord0 + offset[3]);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord0 + offset[5]);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord0 + offset[6]);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord0 - offset[0]);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord0 - offset[3]);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord0 - offset[5]);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord0 - offset[6]);
  acc = q0;
  acc += q1;
  acc += q2;
  acc += q3;
  acc += q4;
  acc += q5;
  acc += q6;
  acc += q7;
  acc *= 1.0f/8.0f;
  return acc;
}

#pragma mark - narrow_blur

struct NarrowBlurOutput {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
  float2 texcoord4;
  float2 texcoord5;
  float2 texcoord6;
  float2 texcoord7;
  float2 texcoord8;
  float2 texcoord9;
  float2 texcoord10;
  float2 texcoord11;
  float2 texcoord12;
  float2 texcoord13;
};

vertex NarrowBlurOutput
narrow_blur_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                 constant float4x4 *mvp_matrix [[ buffer(1) ]],
                 constant float4 &texmat0 [[ buffer(2) ]],
                 constant float2 *offset [[ buffer(3) ]],
                 uint v_id [[ vertex_id ]])
{
  NarrowBlurOutput v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = t0 - offset[6] * texmat0.xy;
  v_out.texcoord1 = t0 - offset[5] * texmat0.xy;
  v_out.texcoord2 = t0 - offset[4] * texmat0.xy;
  v_out.texcoord3 = t0 - offset[3] * texmat0.xy;
  v_out.texcoord4 = t0 - offset[2] * texmat0.xy;
  v_out.texcoord5 = t0 - offset[1] * texmat0.xy;
  v_out.texcoord6 = t0 - offset[0] * texmat0.xy;
  v_out.texcoord7 = t0 + offset[0] * texmat0.xy;
  v_out.texcoord8 = t0 + offset[1] * texmat0.xy;
  v_out.texcoord9 = t0 + offset[2] * texmat0.xy;
  v_out.texcoord10 = t0 + offset[3] * texmat0.xy;
  v_out.texcoord11 = t0 + offset[4] * texmat0.xy;
  v_out.texcoord12 = t0 + offset[5] * texmat0.xy;
  v_out.texcoord13 = t0 + offset[6] * texmat0.xy;
  return v_out;
};

fragment half4
narrow_blur_7_frag(NarrowBlurOutput v_in [[ stage_in ]],
                   texture2d<half> texture0 [[ texture(0) ]],
                   sampler sampler0 [[ sampler(0) ]],
                   constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  return acc;
}

fragment half4
narrow_blur_11_frag(NarrowBlurOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q9 * weight[0].z + acc;
  return acc;
}

fragment half4
narrow_blur_15_frag(NarrowBlurOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  half4 q10 = texture0.sample(sampler0, v_in.texcoord10);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q9 * weight[0].z + acc;
  acc = q3 * weight[0].w + acc;
  acc = q10 * weight[0].w + acc;
  return acc;
}

fragment half4
narrow_blur_19_frag(NarrowBlurOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  half4 q10 = texture0.sample(sampler0, v_in.texcoord10);
  half4 q11 = texture0.sample(sampler0, v_in.texcoord11);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q9 * weight[0].z + acc;
  acc = q3 * weight[0].w + acc;
  acc = q10 * weight[0].w + acc;
  acc = q2 * weight[1].x + acc;
  acc = q11 * weight[1].x + acc;
  return acc;
}

fragment half4
narrow_blur_23_frag(NarrowBlurOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  half4 q10 = texture0.sample(sampler0, v_in.texcoord10);
  half4 q11 = texture0.sample(sampler0, v_in.texcoord11);
  half4 q12 = texture0.sample(sampler0, v_in.texcoord12);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q9 * weight[0].z + acc;
  acc = q3 * weight[0].w + acc;
  acc = q10 * weight[0].w + acc;
  acc = q2 * weight[1].x + acc;
  acc = q11 * weight[1].x + acc;
  acc = q1 * weight[1].y + acc;
  acc = q12 * weight[1].y + acc;
 return acc;
}

fragment half4
narrow_blur_27_frag(NarrowBlurOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant half4 *weight [[ buffer(0) ]])
{
  half4 acc;
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  half4 q5 = texture0.sample(sampler0, v_in.texcoord5);
  half4 q6 = texture0.sample(sampler0, v_in.texcoord6);
  half4 q7 = texture0.sample(sampler0, v_in.texcoord7);
  half4 q8 = texture0.sample(sampler0, v_in.texcoord8);
  half4 q9 = texture0.sample(sampler0, v_in.texcoord9);
  half4 q10 = texture0.sample(sampler0, v_in.texcoord10);
  half4 q11 = texture0.sample(sampler0, v_in.texcoord11);
  half4 q12 = texture0.sample(sampler0, v_in.texcoord12);
  half4 q13 = texture0.sample(sampler0, v_in.texcoord13);
  acc = q6 * weight[0].x;
  acc = q7 * weight[0].x + acc;
  acc = q5 * weight[0].y + acc;
  acc = q8 * weight[0].y + acc;
  acc = q4 * weight[0].z + acc;
  acc = q9 * weight[0].z + acc;
  acc = q3 * weight[0].w + acc;
  acc = q10 * weight[0].w + acc;
  acc = q2 * weight[1].x + acc;
  acc = q11 * weight[1].x + acc;
  acc = q1 * weight[1].y + acc;
  acc = q12 * weight[1].y + acc;
  acc = q0 * weight[1].z + acc;
  acc = q13 * weight[1].z + acc;
  return acc;
}

#pragma mark - motion blur linear_blur

/* N-sample vector blur. */

struct VertexOutput {
  float4 position [[ position ]];
  half4 color0;
  half4 color1;
  float3 normal;
  float2 texcoord0_0;
  float2 texcoord1_0;
  float2 texcoord2_0;
  // TODO: motion blur
};

// TODO: this should be a uniform?
#define MOTION_BLUR_SAMPLES 4

fragment half4
linear_blur_frag(VertexOutput v_in [[ stage_in ]],
                 texture2d<half> texture0 [[ texture(0) ]],
                 sampler sampler0 [[ sampler(0) ]],
                 texture2d<half> texture1 [[ texture(1) ]],
                 sampler sampler1 [[ sampler(1) ]],
                 constant float4 &texmat0 [[ buffer(0) ]])
                 
{
  const int samples = MOTION_BLUR_SAMPLES;
  /* Sample and unpack motion vector from second texture. */
  half4 mv = texture1.sample(sampler1, v_in.texcoord0_0);
  mv.xyz /= max(mv.w, .005h);
  if (!(mv.z > 0.h)) {
    return texture0.sample(sampler0, v_in.texcoord0_0);
  }
  float2 v = static_cast<float2>(250.f * mv.z * (2.f * mv.xy - 1.f)) * texmat0.xy;
  float2 texcoord_lo = v_in.texcoord0_0 - v * .5f;
  /* Sample N texels from along the vector to find the result. */
  half4 acc = 0.h;
  for (int i = 0; i < samples; i++)
    acc = texture0.sample(sampler0, texcoord_lo + v * (float(i)/float(samples))) + acc;
  return acc / float(samples) * v_in.color0;
}

#pragma mark - shading

struct AxialUniforms {
  half4 bgcolor;
  float2 minmax;
};

fragment half4
axial_shading_frag(VertexOutput v_in [[ stage_in ]],
                   texture2d<half> texture0 [[ texture(0) ]],
                   sampler sampler0 [[ sampler(0) ]],
                   constant AxialUniforms &u [[ buffer(0) ]])
{
  half4 p = texture0.sample(sampler0, v_in.texcoord0_0);
  p = v_in.texcoord0_0.x < u.minmax.x || v_in.texcoord0_0.x > u.minmax.y ? u.bgcolor : p;
  return p * v_in.color0;
}

struct RadialUniforms {
  half4 bgcolor;
  float4 map; /* [scale, offset, y] */
  float2 minmax;
};

fragment half4
radial_shading_frag(VertexOutput v_in [[ stage_in ]],
                    texture2d<half> texture0 [[ texture(0) ]],
                    sampler sampler0 [[ sampler(0) ]],
                    constant RadialUniforms &u [[ buffer(0) ]])
{
  float t = dot(v_in.texcoord0_0, v_in.texcoord0_0);
  t = t * rsqrt(t + 1e-6f) * u.map.x + u.map.y;
  half4 p = texture0.sample(sampler0, float2(t, u.map.z));
  p = t < u.minmax.x || t > u.minmax.y ? u.bgcolor : p;
  return p * v_in.color0;
}

#pragma mark - focus_ring

struct VertexFocusRingOutput {
  float4 position [[ position ]];
  float2 texcoord0;
  float2 texcoord1;
  float2 texcoord2;
  float2 texcoord3;
  float2 texcoord4;
};

vertex VertexFocusRingOutput
focus_ring_vert(const device VertexDownInput *vi [[ buffer(0) ]],
                constant float4x4 *mvp_matrix [[ buffer(1) ]],
                constant float4 &texmat0 [[ buffer(2) ]],
                uint v_id [[ vertex_id ]])
{
  VertexFocusRingOutput v_out;
  VertexDownInput v_in = vi[v_id];
  float2 t0 = v_in.texcoord0 * texmat0.xy + texmat0.zw;
  v_out.position = mvp_matrix[0] * v_in.position;
  v_out.texcoord0 = t0;
  v_out.texcoord1 = t0 - float2(1.f, 0.f) * texmat0.xy;
  v_out.texcoord2 = t0 + float2(1.f, 0.f) * texmat0.xy;
  v_out.texcoord3 = t0 - float2(0.f, 1.f) * texmat0.xy;
  v_out.texcoord4 = t0 + float2(0.f, 1.f) * texmat0.xy;
  return v_out;
};

fragment half4
focus_ring_frag(VertexFocusRingOutput v_in [[ stage_in ]],
                texture2d<half> texture0 [[ texture(0) ]],
                sampler sampler0 [[ sampler(0) ]],
                constant float &threshold [[ buffer(0) ]])
{
  half4 q0 = texture0.sample(sampler0, v_in.texcoord0);
  half4 q1 = texture0.sample(sampler0, v_in.texcoord1);
  half4 q2 = texture0.sample(sampler0, v_in.texcoord2);
  half4 q3 = texture0.sample(sampler0, v_in.texcoord3);
  half4 q4 = texture0.sample(sampler0, v_in.texcoord4);
  if (!(q0.a < threshold)) {
    return 0.h;
  } else {
    float max_a = max(max(q1.a, q2.a), max(q3.a, q4.a));
    return half4(step(threshold, max_a));
  }
}
