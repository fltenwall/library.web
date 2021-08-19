import service, { Authority } from '/@/api/system-manage/module-manage';
import { message } from 'ant-design-vue';

export async function queryRoleAuthority(): Promise<Authority> {
  try {
    const { data } = await service.fecthListByAuthority();
    return data;
  } catch (err) {
    message.error('获取权限列表数据失败');
  }
  return {};
}
